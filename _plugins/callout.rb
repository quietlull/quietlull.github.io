module Jekyll
  class CalloutTag < Liquid::Block
    CORNERS = %w[tl tr bl br].map { |c| %(<i class="tape tape--corner tape--c-#{c}"></i>) }.join.freeze

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
