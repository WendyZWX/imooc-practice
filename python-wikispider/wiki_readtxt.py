# -*- coding: utf-8 -*-
"""
Created on Fri Mar  3 10:09:15 2017

@author: fsc
"""

from urllib.request import urlopen
html = urlopen("https://en.wikipedia.org/robots.txt")
print (html.read().decode("utf-8"))