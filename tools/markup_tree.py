"""A small HTML tree for the workbench generator. Standard library only.

WHY A TREE AND NOT THE OLD STREAMING EXTRACTOR. The first generator copied tags as they went by.
That could not answer the two questions everything else depends on: "what are this element's
ancestors?" (page-scoped CSS needs them) and "is this element inside another element of the same
component?" (otherwise a sub-element gets shown as if it were the component). It also never
finished an <hr>, so a specimen starting at one swallowed the section after it.
"""
from html.parser import HTMLParser

VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link',
        'meta', 'param', 'source', 'track', 'wbr'}


class Node:
    __slots__ = ('tag', 'attrs', 'children', 'parent', 'text')

    def __init__(self, tag, attrs=None, parent=None, text=None):
        self.tag = tag            # None for a text node
        self.attrs = attrs or []  # list of (name, value-or-None), values already unescaped
        self.children = []
        self.parent = parent
        self.text = text

    def get(self, name, default=None):
        for k, v in self.attrs:
            if k == name:
                return v if v is not None else ''
        return default

    def has(self, name):
        return any(k == name for k, _ in self.attrs)

    @property
    def classes(self):
        return (self.get('class') or '').split()

    def walk(self):
        """Every element below this one, in document order."""
        for child in self.children:
            if child.tag:
                yield child
                yield from child.walk()

    def ancestors(self):
        """Nearest first, stopping before the synthetic root."""
        node = self.parent
        while node is not None and node.tag != '#root':
            yield node
            node = node.parent

    def find(self, tag):
        for node in self.walk():
            if node.tag == tag:
                return node
        return None


class _Builder(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.root = Node('#root')
        self.stack = [self.root]

    def _add(self, tag, attrs):
        node = Node(tag, attrs, self.stack[-1])
        self.stack[-1].children.append(node)
        return node

    def handle_starttag(self, tag, attrs):
        node = self._add(tag, attrs)
        if tag not in VOID:
            self.stack.append(node)

    def handle_startendtag(self, tag, attrs):
        self._add(tag, attrs)

    def handle_endtag(self, tag):
        if tag in VOID:
            return
        # Close back to the nearest open element of this name. A stray close tag is ignored
        # rather than allowed to unwind the whole stack.
        for i in range(len(self.stack) - 1, 0, -1):
            if self.stack[i].tag == tag:
                del self.stack[i:]
                return

    def _text(self, value):
        self.stack[-1].children.append(Node(None, parent=self.stack[-1], text=value))

    def handle_data(self, data):
        self._text(data)

    def handle_entityref(self, name):
        self._text('&%s;' % name)

    def handle_charref(self, name):
        self._text('&#%s;' % name)


def parse(html):
    builder = _Builder()
    builder.feed(html)
    builder.close()
    return builder.root


def _attr(value):
    return value.replace('&', '&amp;').replace('"', '&quot;')


def open_tag(node, extra=None, drop=()):
    parts = [node.tag]
    for name, value in node.attrs:
        if name in drop:
            continue
        parts.append(name if value is None else '%s="%s"' % (name, _attr(value)))
    for name, value in (extra or []):
        parts.append(name if value is None else '%s="%s"' % (name, _attr(value)))
    return '<%s>' % ' '.join(parts)


def serialize(node, extra=None, drop=(), skip=('script',)):
    """outerHTML. `extra` and `drop` apply to this node only, never to its children."""
    if node.tag is None:
        return node.text
    if node.tag in skip:
        return ''
    out = [open_tag(node, extra, drop)]
    if node.tag in VOID:
        return out[0]
    for child in node.children:
        out.append(serialize(child, skip=skip))
    out.append('</%s>' % node.tag)
    return ''.join(out)


def text_of(node):
    if node.tag is None:
        return node.text
    return ''.join(text_of(child) for child in node.children)
