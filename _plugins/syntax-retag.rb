# frozen_string_literal: true

# SYNTAX RE-TAG - splits the token classes Rouge cannot split on its own.
#
# WHY THIS EXISTS. Rod's syntax role list (element-tracker.md, locked 2026-08-23, refined
# 2026-09-03) cannot be expressed in CSS, because Rouge puts tokens with different ROLES in the
# same CLASS. Measured on real output from this project's own Rouge:
#
#   k   ->  return if else        AND  static const struct     (control flow + storage keywords)
#   n   ->  float bool            AND  dir uv seed             (scalar types + variables)
#           AND the struct NAME, AND SCREAMING_SNAKE macro functions
#   nb  ->  lerp saturate dot     AND  noise                   (real intrinsics + a local variable
#                                                               that happens to share a name with
#                                                               one, AND vertex semantics)
#
# No selector can separate those, so the split happens here, once, at build time. Every rule below
# is POSITIONAL or a closed word list - none of them guess, and none need per-language maintenance
# beyond the two keyword sets.
#
# EVERY FAULT THIS FIXES WAS FOUND BY ROD LOOKING AT A RENDERED BLOCK, not by any checker, which
# is the thing worth remembering: a wrong colour is still a valid colour and nothing errors.
#
# SCOPE. Only inside `<div class="highlight">`, which Rouge emits for code BLOCKS. Inline code has
# no such wrapper, so D31 ("inline code is not included in the carve-out") holds by construction
# rather than by a selector that has to be kept correct.

module SyntaxRetag
  # A span, as Rouge writes it. Rouge never nests spans inside spans, so a non-greedy match on a
  # single class attribute is exact rather than approximate.
  SPAN = /<span class="([a-z0-9]+)">(.*?)<\/span>/m.freeze

  BLOCK = /<div class="highlight">.*?<\/div>/m.freeze

  CONTROL = %w[if else return for while do switch case default break continue discard].freeze
  STORAGE = %w[static const struct inline uniform in out inout void cbuffer register
               groupshared precise centroid nointerpolation packoffset].freeze
  SCALARS = %w[float int uint bool half double fixed dword min16float].freeze

  SCREAMING   = /\A[A-Z][A-Z0-9_]+\z/.freeze
  CAPITALISED = /\A[A-Z]/.freeze
  BRACKET     = /\A[()\[\]{}]+\z/.freeze

  # Rouge escapes markup before it writes a span, so a token's text can carry entities. Every
  # comparison below is against a plain ASCII operator, and the only escaped characters Rouge
  # produces are `&gt;` `&lt;` `&amp;` `&quot;`, none of which can be one of those operators. So
  # decoding is unnecessary here, and doing it would risk re-encoding differences on the way out.
  def self.retag(html)
    html.gsub(BLOCK) { |block| retag_block(block) }
  end

  # Walks back from a colon to the start of its line. A `?` on the way means the colon closes a
  # TERNARY rather than introducing a semantic. A newline ends the search, which is how Rouge
  # marks a line break.
  def self.ternary_colon?(tokens, meaningful, here)
    (here - 1).downto(0) do |n|
      text = tokens[meaningful[n]][1]
      return false if text.include?("\n")
      return true if text.strip == '?'
    end
    false
  end

  def self.retag_block(block)
    tokens = block.scan(SPAN)
    return block if tokens.empty?

    # indices of the tokens whose text is not blank, so the positional rules are not fooled by the
    # whitespace Rouge emits between tokens
    meaningful = tokens.each_index.reject { |i| tokens[i][1].strip.empty? }
    position   = meaningful.each_with_index.to_h { |token_index, n| [token_index, n] }

    extra = Array.new(tokens.length) { [] }

    tokens.each_with_index do |(css_class, raw), index|
      text = raw.strip
      next if text.empty?

      here      = position[index]
      following = meaningful[here + 1]
      preceding = here.positive? ? meaningful[here - 1] : nil

      next_text    = following ? tokens[following][1].strip : ''
      prev_text    = preceding ? tokens[preceding][1].strip : ''
      call_follows = next_text.start_with?('(')

      # A SEMANTIC is an identifier after a colon: POSITION, TEXCOORD0, SV_DispatchThreadID.
      # Positional, so it catches them even though Rouge classes some `nb` (the same class as
      # `lerp`) and others plain `n` - which is exactly why they used to render different colours
      # from each other.
      #
      # TWO GUARDS, both added after the bare rule fired on a real post:
      # `next = next < 0.005 ? 0.0 : next;` in ComputeGrass painted that last `next` as a semantic,
      # because a ternary's colon is indistinguishable from a declaration's on its own.
      #   1. a ternary has a `?` earlier on the SAME LINE; a declaration never does
      #   2. HLSL semantics are capitalised by convention
      # Either guard alone would have caught that case. Both are cheap and they fail differently,
      # which is the point of keeping the pair.
      if prev_text == ':' && text.match?(CAPITALISED) && !ternary_colon?(tokens, meaningful, here)
        extra[index] << 'x-semantic'
        next
      end

      case css_class
      when 'k'
        extra[index] << (CONTROL.include?(text) ? 'x-control' : 'x-storage')
        # A struct NAME is the identifier straight after `struct`. Positional, so it needs no list
        # of type names and cannot mis-fire on an ordinary variable.
        extra[following] << 'x-class' if text == 'struct' && following && tokens[following][0] == 'n'
      when 'n'
        if SCALARS.include?(text)
          extra[index] << 'x-type'
        elsif text.match?(SCREAMING)
          # SCREAMING_SNAKE alone does NOT mean constant: a SCREAMING macro FUNCTION is followed
          # by `(`. Rod caught SAMPLE_TEXTURE2D rendering as a constant.
          extra[index] << (call_follows ? 'x-func' : 'x-const')
        end
      when 'nb', 'nf', 'fm'
        # Rouge's function classes are not reliable; only the `(` is. `noise` comes back `nb`
        # because HLSL has a noise() intrinsic, but `float noise = ...` is a local variable.
        extra[index] << 'x-notcall' unless call_follows
      when 'p'
        extra[index] << 'x-bracket' if text.match?(BRACKET)
      end
    end

    return block if extra.all?(&:empty?)

    cursor = -1
    block.gsub(SPAN) do
      cursor += 1
      added = extra[cursor]
      if added.nil? || added.empty?
        Regexp.last_match(0)
      else
        %(<span class="#{Regexp.last_match(1)} #{added.join(' ')}">#{Regexp.last_match(2)}</span>)
      end
    end
  end
end

Jekyll::Hooks.register %i[documents pages], :post_render do |item|
  next unless item.output_ext == '.html'
  next unless item.output.include?('<div class="highlight">')

  item.output = SyntaxRetag.retag(item.output)
end
