"""
WSGI config for untitled project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.0/howto/deployment/wsgi/
"""

import os
import sys

from django.core.wsgi import get_wsgi_application

sys.path.append('/var/www/spid-test.co.uk/public_html')
sys.path.append('/var/www/spid-test.co.uk/public_html/venv/lib/python3.6/site-packages')

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "untitled.settings")

application = get_wsgi_application()