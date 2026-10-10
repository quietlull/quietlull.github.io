# frozen_string_literal: true


module SyntaxRetag
  SPAN = /<span class="([a-z0-9]+)">(.*?)<\/span>/m.freeze

  BLOCK = /<div class="highlight">.*?<\/div>/m.freeze

  CONTROL = %w[if else return for while do switch case default break continue discard].freeze
  STORAGE = %w[static const struct inline uniform in out inout void cbuffer register
               groupshared precise centroid nointerpolation packoffset].freeze
  SCALARS = %w[float int uint bool half double fixed dword min16float].freeze

  SCREAMING   = /\A[A-Z][A-Z0-9_]+\z/.freeze
  CAPITALISED = /\A[A-Z]/.freeze
  BRACKET     = /\A[()\[\]{}]+\z/.freeze

  def self.retag(html)
    html.gsub(BLOCK) { |block| retag_block(block) }
  end

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

      if prev_text == ':' && text.match?(CAPITALISED) && !ternary_colon?(tokens, meaningful, here)
        extra[index] << 'x-semantic'
        next
      end

      case css_class
      when 'k'
        extra[index] << (CONTROL.include?(text) ? 'x-control' : 'x-storage')
        extra[following] << 'x-class' if text == 'struct' && following && tokens[following][0] == 'n'
      when 'n'
        if SCALARS.include?(text)
          extra[index] << 'x-type'
        elsif text.match?(SCREAMING)
          extra[index] << (call_follows ? 'x-func' : 'x-const')
        end
      when 'nb', 'nf', 'fm'
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
