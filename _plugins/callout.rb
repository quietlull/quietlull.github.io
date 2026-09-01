# {% callout note %} ... markdown body ... {% endcallout %}
#
# Emits the d-callout box for all four categories (Rod, 2026-09-01: "callouts should be A and
# not use any of the other candidates. the shells should be the same across all versions.").
# Tape placement per category is decision D30 (docs/DECISIONS.md):
#   note    -> A, one strip over the top edge   (green)
#   tldr    -> B, one strip down the left edge  (orange)
#   warning -> D, four diagonal corner tabs     (pink)
#   quote   -> C, two L-shaped corners          (blue)
# Colour is NOT written here: the d-callout--<type> class sets --tape-hue on the host
# (decisions.scss), so a callout cannot render grey tape via a forgotten colour class.

module Jekyll
  class CalloutTag < Liquid::Block
    CORNERS = %w[tl tr bl br].map { |c| %(<i class="tape tape--corner tape--c-#{c}"></i>) }.join.freeze

    # Each L is two strips crossing at the corner, vertical arm first (washi-tape.scss:76).
    L_CORNERS = %w[tl br].map { |c| %(<i class="tape tape--v tape--#{c}"></i><i class="tape tape--h tape--#{c}"></i>) }.join.freeze

    TYPES = {
      'note'    => ['Note',    %(<i class="tape tape--top"></i>)],
      'tldr'    => ['TL;DR',   %(<i class="tape tape--left"></i>)],
      'warning' => ['Warning', CORNERS],
      'quote'   => ['Quote',   L_CORNERS],
    }.freeze

    def initialize(tag_name, markup, tokens)
      super
      @type = markup.strip
      return if TYPES.key?(@type)

      # Failing loudly at build time is the point of the tag: a typo must never ship as an
      # unstyled box or silently fall back to some default category.
      raise Liquid::SyntaxError,
            "callout: unknown type '#{@type}'. Valid types: note, tldr, warning, quote."
    end

    def render(context)
      markdown = context.registers[:site].find_converter_instance(Jekyll::Converters::Markdown)
      label, tape = TYPES.fetch(@type)
      body = markdown.convert(super).strip
      %(<aside class="d-callout d-callout--#{@type}">#{tape}<span class="d-callout__label">#{label}</span>#{body}</aside>)
    end
  end
end

Liquid::Template.register_tag('callout', Jekyll::CalloutTag)
