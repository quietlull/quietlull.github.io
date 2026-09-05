"""Pull a REAL instance of a component out of a built page, with balanced tags.

Regex cannot do this: the markup nests, and half the components contain each other.
"""
from html.parser import HTMLParser

VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link',
        'meta', 'param', 'source', 'track', 'wbr'}


class Grab(HTMLParser):
    def __init__(self, token):
        super().__init__(convert_charrefs=False)
        self.token = token
        self.depth = 0
        self.out = []
        self.done = False
        self.hit = False

    def _attrs(self, attrs):
        s = ''
        for k, v in attrs:
            s += ' ' + k if v is None else ' %s="%s"' % (k, v.replace('"', '&quot;'))
        return s

    def handle_starttag(self, tag, attrs):
        if self.done:
            return
        classes = ''
        for k, v in attrs:
            if k == 'class' and v:
                classes = v
        if not self.hit and self.token in classes.split():
            self.hit = True
            self.depth = 0
        if self.hit:
            self.out.append('<%s%s>' % (tag, self._attrs(attrs)))
            if tag not in VOID:
                self.depth += 1

    def handle_startendtag(self, tag, attrs):
        if self.hit and not self.done:
            self.out.append('<%s%s />' % (tag, self._attrs(attrs)))

    def handle_endtag(self, tag):
        if not self.hit or self.done or tag in VOID:
            return
        self.out.append('</%s>' % tag)
        self.depth -= 1
        if self.depth <= 0:
            self.done = True

    def handle_data(self, d):
        if self.hit and not self.done:
            self.out.append(d)

    def handle_entityref(self, name):
        if self.hit and not self.done:
            self.out.append('&%s;' % name)

    def handle_charref(self, name):
        if self.hit and not self.done:
            self.out.append('&#%s;' % name)

    def handle_comment(self, data):
        pass  # comments are not part of a component


def grab(html, token):
    """Return the outerHTML of the first element carrying `token`, or None."""
    p = Grab(token)
    try:
        p.feed(html)
    except Exception:
        return None
    if not p.hit:
        return None
    return ''.join(p.out).strip()
