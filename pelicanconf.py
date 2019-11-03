#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = 'Ahmad Wijaya'
SITENAME = 'Ahmad Wijaya CV'
SITEURL = ''

PATH = 'content'

THEME = "themes/resume"

TIMEZONE = 'Asia/Jakarta'

DEFAULT_LANG = 'en'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
LINKS = (('Pelican', 'http://getpelican.com/'),
         ('Python.org', 'http://python.org/'),
         ('Jinja2', 'http://jinja.pocoo.org/'),
         ('You can modify those links in your config file', '#'),)

# Social widget
SOCIAL = (('You can add links in your config file', '#'),
          ('Another social link', '#'),)

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True

#Profile information
NAME = 'Ahmad Wijaya'
TAGLINE = 'Software Developer'
PIC = 'Dream.jpg'

#sidebar links
EMAIL = 'cibofdev@gmail.com'
PHONE = '(+62) 89525708804'
WEBSITE = 'cibofdevs.github.io'
LINKEDIN = 'cibofdev'
GITHUB = 'cibofdevs'
TWITTER = '@cibofdev'

CAREER_SUMMARY = 'Halo, Nama Saya Ahmad Wijaya. Saya merupakan Mahasiswa Fresh Graduate Tahun ini. Saya Memiliki Keahlian dibidang Web Development, Android Development dan IoT.'

SKILLS = [
	{
		'title': 'JAVA',
   		'level': '90'
   	},
  	{
  		'title': 'Javascript &amp; jQuery',
   		'level': '95'
   	},
    {
  		'title': 'HTML5 &amp; CSS',
  		'level': '95'
  	},
  	{
  		'title': 'React',
  		'level': '90'
  	},
  	{
  		'title': 'PHP',
  		'level': '85'
  	}
]

PROJECT_INTRO = 'Berikut beberapa project yang pernah saya kerjakan. '

PROJECTS = [
	{
		'title': 'Company Profile',
		'tagline': 'Web company profile orange chicken.'
	},
	{
		'title': 'Android E-Commerce',
		'tagline': 'Aplikasi android untuk memudahkan transaksi jual dan beli dengan sistem B2C (Business to Customer).'
	},
	{
		'title': 'Sistem Monitoring Bebasis IoT',
		'tagline': 'Project monitoring suhu berbasis website terintegrasi dengan perangkat IoT (Internet of Things).'
	}
]

LANGUAGES = [
	{
		'name': 'Indonesian',
		'description': 'Native'
	},
	{
		'name': 'English',
		'description': 'Professional'
	}
]

INTERESTS = [
	'Programming',
	'Guitar'
]

EXPERIENCES = [
	{
		'job_title': 'Web Developer',
		'time': 'Aug 2019 - Present',
		'company': 'Orange Chicken',
		'details': 'Mengembangkan website company profile orange chicken cirebon.'	
	},
	{
		'job_title': 'Web Developer',
		'time': 'Okt 2019 - Present',
		'company': 'IPIEMS Cirebon',
		'details': 'Mengembangkan website sistem informasi akademik.'	
	}
]

EDUCATIONS = [
	{
		'degree': 'S.Kom in Information Technology',
		'meta': 'STMIK IKMI Cirebon',
		'time': '2015 - 2019'
	},
	{
		'degree': 'High School',
		'meta': 'MAN 1 Jatiwangi',
		'time': '2015'
	}
]