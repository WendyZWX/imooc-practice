# -*- coding: utf-8 -*-
"""
Created on Thu Mar  2 10:17:54 2017

@author: fsc
"""

from urllib.request import urlopen
from bs4 import BeautifulSoup
import re

#请求URL并把结果用UTF-8编码
resp = urlopen("https://en.wikipedia.org/wiki/Main_Page").read().decode("utf-8")
#使用BS去解析
soup = BeautifulSoup(resp,"html.parser")
#获取所有以/wiki/开头的a标签的href属性
listUrls = soup.findAll("a", href=re.compile('^/wiki/'))
for url in listUrls:
    if not re.search('\.(jpg|JPG)$', url['href']): #去掉jpg|JPG图片
        print (url.get_text(), "----->","https://en.wikipedia.org"+url["href"])
    

