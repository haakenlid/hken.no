import subprocess
import json

def bundle(js='cli.bundle.js', **props):
    return subprocess.check_output(
        ['node', js, json.dumps(props)],
        universal_newlines=True,
    )

def css(fn='cli.css'):
    with open(fn) as fp:
        return '<style>{}</style>'.format(fp.read())
