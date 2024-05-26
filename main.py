import discord,operator,qrcode
import os
import typing
import animec
import time
import youtube_dl
import datetime
import requests
import random
import pytz
import inspect
import io
import textwrap
import traceback
import bs4
import aiohttp
from contextlib import redirect_stdout
import wikipedia
import urllib.request
import re
import ffmpeg
import DiscordUtils
from images import fortunes
import giphy_client
import utils 
import urllib
import secrets
import sys
import praw
import flask
import asyncio
import aiosqlite
import sqlite3
import asyncpg
import mention
import aiohttp
import json
import asyncio
import youtube_dl
from random import randint
from PIL import Image
from PIL import Image,ImageFont,ImageDraw,ImageFilter
from typing import Union, Optional
from discord.ext import commands
from steam.webapi import WebAPI
from steam.steamid import SteamID
from steam.enums import EPersonaState
from inspect import getsource
from datetime import time
from enum import Enum
from discord.ext.commands import has_permissions, MissingPermissions, is_owner
from io import BytesIO
from giphy_client.rest import ApiException
from discord import Game
from discord.ext.commands import BucketType
from googlesearch import search 
from discord.voice_client import VoiceClient
from random import choice as randchoice
from discord.ext import commands
from mal import *
from fortunes import fortunes
from discord.ext.commands import Bot
from io import BytesIO 
from discord.ext import commands, tasks
from typing import Optional
from discord import __version__ as discord_version
from asyncio import sleep
from datetime import datetime, timedelta
from discord import User
from psutil import Process, virtual_memory
from discord import Embed, Member
from pytube import YouTube
from discord.utils import get
from afks import afks
from discord import FFmpegPCMAudio
import requests
import base64 
import spotipy
from spotipy import Spotify

from discord import TextChannel

from youtube_dl import YoutubeDL
import vacefron
import discord, asyncio, youtube_dl
from bs4 import BeautifulSoup
intents = discord.Intents.all()




from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


with open("typingtext.txt","r") as file:
  sentences = [i.replace('\n','') or i for i in file.readlines()]

async def get_prefix(bot, message):
  async with aiosqlite.connect("prefixes.db") as db:
      async with db.cursor() as cursor:
        await cursor.execute('SELECT prefix FROM prefix WHERE guild = ?',(message.guild.id,))
        data = await cursor.fetchone()
        if data:
          return data
        else:
          try:
            await cursor.execute('INSERT INTO prefix (prefix, guild) VALUES (?, ?)', ('$', message.guild.id,))
            await cursor.execute('SELECT prefix FROM prefix WHERE guild = ?',(message.guild.id,))
            data = await cursor.fetchone()
            if data:
              await cursor.execute('UPDATE prefix SET prefix = ? WHERE guild = ?', (prefix, message.guild.id,))
          except Exception:
            return '$'
      
 

bot = commands.Bot(command_prefix =get_prefix, intents=intents, case_insensitive=True)
vac_api = vacefron.Client()



  

@bot.command()
async def p(ctx):
  async with aiosqlite.connect("prefixes.db") as db:
      async with db.cursor() as cursor:
        await cursor.execute('SELECT prefix FROM prefix WHERE guild = ?',(ctx.guild.id,))
        data = await cursor.fetchone()
        await ctx.send(data)

  


def retrieve_player_stats(player_tag):
    url = "https://api.clashofclans.com/v1/players/%23{}".format(player_tag)
    headers = {
        "Accept": "application/json",
        "authorization": 
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjBhNmM3NjU3LTIzZGUtNDQxZi05ZjllLTQ0YmUxNWU1ZWE4YiIsImlhdCI6MTY3NTU5ODMzMCwic3ViIjoiZGV2ZWxvcGVyLzYyZGQzZDgzLTBjZjAtMzEzMy04MmIxLTA4OTQxYTk3YzkzNiIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjEwMy4xNTYuMTgyLjQyIl0sInR5cGUiOiJjbGllbnQifV19.4VeSMjAAC0UbX22nX0hG5vwd50NcaFR-Li1vkYjwntjtU594zbu1JHY4mehJhqFIhAVPlm5M93IqHKR-Q3OgUw"}

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        player_stats = response.json()
        return player_stats
    else:
        return None

@bot.command()
async def coc_stats(ctx, player_tag: str):
    player_stats = retrieve_player_stats(player_tag)

    if player_stats:
        response = "Name: {}\nLevel: {}\nTrophies: {}\nClan: {}".format(
            player_stats["name"],
            player_stats["townHallLevel"],
            player_stats["trophies"],
            player_stats["clan"]["name"]
        )
    else:
        response = "Could not retrieve player stats."

    await ctx.send(response)


class CrewMateColors(Enum):
    BLACK = 1
    BLUE = 2
    BROWN = 3
    CYAN = 4
    DARKGREEN = 5
    DARK_GREEN = 5
    LIME = 6
    ORANGE = 7
    PINK = 8
    PURPLE = 9
    RED = 10
    WHITE = 11
    YELLOW = 12
    RANDOM = 13





@bot.command()
async def eject(ctx, name):
    image = await vac_api.ejected(name, crewmate, impostor)
    image_out = discord.File(fp = await image.read(), filename = "ejected.png")
    await ctx.send(file = image_out)

def not_allowed(member):
  db = sqlite3.connect('auto.sqlite')
  cursor = db.cursor()
  cursor.execute(f'SELECT word FROM auto WHERE guild_id = {member.guild.id}')
  result = cursor.fetchall()
  if result is None:
    return

def msg_contains_word(msg, word):
    return re.search(fr'\b({word})\b', msg) is not None



@bot.event
async def on_message(message):
    if message.content == "<@!916960367018651678>":
        embed=discord.Embed(description="Hello! user i'm Captain Hook at your service. My default prefix is `$`", color=discord.Color.blue())
        await message.channel.send(embed=embed)
    db = sqlite3.connect('auto.sqlite')
    cursor = db.cursor()
    cursor.execute(f'SELECT word FROM auto WHERE guild_id = {message.guild.id}')
    result = cursor.fetchall()
    bword = [x[0] for x in result]
    if any(b in bword for b in message.content.lower().split(" ")):
      await message.channel.purge(limit=1)
      msg = await message.channel.send(f"Hey! {message.author.name}, this message is not allowed here :/")
      await asyncio.sleep(5)
      await msg.delete()

    if message.author == bot.user:
        return    
    if message.content.startswith("rickroll"):
      await message.channel.send("https://imgur.com/NQinKJB")
    if message.content.startswith("panic"):
      await message.channel.send("https://tenor.com/view/kermit-panic-gif-22140702")  
    



    
    
  
      
               
    await bot.process_commands(message)





@bot.command()
@commands.has_permissions(manage_messages=True)
async def bword(ctx, word=None):
  if word == None:
    await ctx.send("Please provide a word to blacklist")
    return
  with sqlite3.connect('auto.sqlite') as connection:
    cursor = connection.cursor()
    cursor.execute('INSERT INTO auto(guild_id, word) VALUES(?, ?)', (ctx.guild.id, word))
    await ctx.send(f"Added {word} into my blacklist!")
    connection.commit()

@bot.command()
async def words(ctx):
  db = sqlite3.connect('auto.sqlite')
  cursor = db.cursor()
  cursor.execute(f'SELECT word FROM auto WHERE guild_id = {ctx.guild.id}')
  result = cursor.fetchall()
  embed=discord.Embed(title="Banned words",description=result)
  await ctx.send(embed=embed)

@bot.command()
async def bdelete(ctx, word=None):
  db = sqlite3.connect('auto.sqlite')
  cursor = db.cursor()
  cursor.execute(f'SELECT word FROM auto WHERE guild_id = {ctx.guild.id}')
  result = cursor.fetchone()
  if word == None:
    await ctx.send("Please mention a word to delete :/")
    return
  if result is None:
    return
  else:  
    cursor.execute('DELETE FROM auto WHERE word = ? AND guild_id = ?',(word, ctx.guild.id,))
    await ctx.send(f"Deleted {word} from my blacklist!")
  
 
  



@bot.event
async def on_member_join(member):
  db = sqlite3.connect('main.sqlite')
  cursor = db.cursor()
  cursor.execute(f'SELECT channel_id FROM main WHERE guild_id = {member.guild.id}')
  result = cursor.fetchone()
  if result is None:
    return
  else:
    cursor.execute(f'SELECT msg FROM main WHERE guild_id = {member.guild.id}')
    result1 = cursor.fetchone()
    members = len(list(member.guild.members))
    mention = member.mention
    user = member.name
    guild = member.guild

    embed=discord.Embed(color=discord.Color.random(),description=str(result1[0]).format(members=members, mention=mention, user=user, guild=guild))
    embed.set_thumbnail(url=f"{member.avatar_url}")
    embed.set_author(name=f"{member.name}", icon_url=f"{member.avatar_url}")
    embed.set_footer(text=f"{member.guild}", icon_url=f"{member.guild.icon_url}")
    embed.timestamp = datetime.datetime.utcnow()

    channel = bot.get_channel(id=int(result[0]))
    await channel.send(embed=embed)

@bot.event
async def on_member_remove(member):
  db = sqlite3.connect('main.sqlite')
  cursor = db.cursor()
  cursor.execute(f'SELECT channel_id FROM leave WHERE guild_id = {member.guild.id}')
  result = cursor.fetchone()
  if result is None:
    return
  else:
    cursor.execute(f'SELECT msg FROM leave WHERE guild_id = {member.guild.id}')
    result1 = cursor.fetchone()
    members = len(list(member.guild.members))
    mention = member.mention
    user = member.name
    guild = member.guild

    embed=discord.Embed(color=discord.Color.random(),description=str(result1[0]).format(members=members, mention=mention, user=user, guild=guild))
    embed.set_thumbnail(url=f"{member.avatar_url}")
    embed.set_author(name=f"{member.name}", icon_url=f"{member.avatar_url}")
    embed.set_footer(text=f"{member.guild}", icon_url=f"{member.guild.icon_url}")
    embed.timestamp = datetime.datetime.utcnow()

    channel = bot.get_channel(id=int(result[0]))
    await channel.send(embed=embed)

@bot.group(invoke_without_command=True)
async def leave(ctx):
  embed=discord.Embed(title="Available Setup Commands:")
  embed.add_field(name="Leave channel",value="$leave channel <#channel>")
  embed.add_field(name="Leave text",value="$leave text <welcome {mention} to {guild}! {members} were waiting for you! {user}>",inline=False)
  await ctx.send(embed=embed)



@leave.command()
async def channel(ctx, channel:discord.TextChannel):
  if ctx.message.author.guild_permissions.manage_messages:
    db = sqlite3.connect('main.sqlite')
    cursor = db.cursor()
    cursor.execute(f'SELECT channel_id FROM leave WHERE guild_id = {ctx.guild.id}')
    result = cursor.fetchone()
    if result is None:
      sql = ("INSERT INTO leave (guild_id, channel_id) VALUES(?,?)")
      val = (ctx.guild.id, channel.id)
      await ctx.send(f"Leave channel has been set to {channel.mention}")
    elif result is not None:
      sql = ("UPDATE leave SET channel_id = ? WHERE guild_id = ?")
      val = (channel.id, ctx.guild.id)
      await ctx.send(f"Leave channel has been set to {channel.mention}")
    cursor.execute(sql, val)
    db.commit()
    cursor.close()
    db.close()
  else:
    await ctx.send("You don't have `manage_messages` perms!")

@leave.command()
async def text(ctx,* ,text):
  if ctx.message.author.guild_permissions.manage_messages:
    db = sqlite3.connect('main.sqlite')
    cursor = db.cursor()
    cursor.execute(f'SELECT msg FROM leave WHERE guild_id = {ctx.guild.id}')
    result = cursor.fetchone()
    if result is None:
      sql = ("INSERT INTO leave (guild_id, msg) VALUES(?,?)")
      val = (ctx.guild.id, text)
      await ctx.send(f"Leave message has been set to `{text}`")
    elif result is not None:
      sql = ("UPDATE leave SET msg = ? WHERE guild_id = ?")
      val = (text, ctx.guild.id)
      await ctx.send(f" Leave message has been set to `{text}`")
      cursor.execute(sql, val)
      db.commit()
      cursor.close()
      db.close() 
  else:
    await ctx.send("You don't have `manage_messages` perms!")

  
@bot.group(invoke_without_command=True)
async def welcome(ctx):
  embed=discord.Embed(title="Available Setup Commands:")
  embed.add_field(name="welcome channel",value="$welcome channel <#channel>")
  embed.add_field(name="welcome text",value="$welcome text <welcome {mention} to {guild}! {members} were waiting for you! {user}>",inline=False)
  embed.add_field(name="welcome text example",value="$welcome example A sweet design for your server, if you don't have any in your mind.",inline=False)
  await ctx.send(embed=embed)

@welcome.command()
async def example(ctx):
  with open('./images/example.png', 'rb') as f:
    picture = discord.File(f)
    embed=discord.Embed(title="Welcome text example!",description="""
    You can copy paste this and use $welcome text to set it!

    $welcome text <:info:916983567911899146> Information
> 🥳  welcome to the server {mention}
> 💬  chat in 〚💬〛general 
> <:smugdoggo_hehe:916983597636939796> have fun
    """,color=discord.Color.random())
    embed.add_field(name="Params",value="{guild} = guild name, {user} = member name, {mention} = member.mention and {members} = members count rn after you joining. if you use these things it will show the stuff as given in the msg")
    embed.set_image(url="https://cdn.discordapp.com/attachments/916966052871700480/927944855819284520/images_example.png")
    await ctx.send(embed=embed)
 





@welcome.command()
async def channel(ctx, channel:discord.TextChannel):
  if ctx.message.author.guild_permissions.manage_messages:
    db = sqlite3.connect('main.sqlite')
    cursor = db.cursor()
    cursor.execute(f'SELECT channel_id FROM main WHERE guild_id = {ctx.guild.id}')
    result = cursor.fetchone()
    if result is None:
      sql = ("INSERT INTO main (guild_id, channel_id) VALUES(?,?)")
      val = (ctx.guild.id, channel.id)
      await ctx.send(f"Welcome channel has been set to {channel.mention}")
    elif result is not None:
      sql = ("UPDATE main SET channel_id = ? WHERE guild_id = ?")
      val = (channel.id, ctx.guild.id)
      await ctx.send(f"Welcome channel has been set to {channel.mention}")
    cursor.execute(sql, val)
    db.commit()
    cursor.close()
    db.close()
  else:
    await ctx.send("You don't have `manage_messages` perms!")  

@welcome.command()
async def text(ctx,* ,text):
  if ctx.message.author.guild_permissions.manage_messages:
    db = sqlite3.connect('main.sqlite')
    cursor = db.cursor()
    cursor.execute(f'SELECT msg FROM main WHERE guild_id = {ctx.guild.id}')
    result = cursor.fetchone()
    if result is None:
      sql = ("INSERT INTO main (guild_id, msg) VALUES(?,?)")
      val = (ctx.guild.id, text)
      await ctx.send(f"Welcome message has been set to `{text}`")
    elif result is not None:
      sql = ("UPDATE main SET msg = ? WHERE guild_id = ?")
      val = (text, ctx.guild.id)
      await ctx.send(f" Welcome message has been set to `{text}`")
      cursor.execute(sql, val)
      db.commit()
      cursor.close()
      db.close() 
  else:
    await ctx.send("You don't have `manage_messages` perms!")




import humanfriendly
import datetime

@bot.command() 
async def mute(ctx, member: discord.Member, time, reason):
  time = humanfriendly.parse_time(time)
  await member.edit(timeout=discord.utils.utchow()+datetime.timedelta(seconds=time))
  await ctx.send(f"{member.member} has been muted because {reason}")


@bot.event
async def on_guild_join(guild):
    gmember=guild.member_count
    gname=guild.name
    gid=guild.id
    invitelink = ""
    i = 0
    while invitelink == "":
      channel = guild.text_channels[i]
      link = await channel.create_invite(max_age=300,max_uses=100)
      invitelink = str(link)
      i += 100
    adminBug = bot.get_channel(916966062501806110)
    embed=discord.Embed(title=f"{guild.name}",description=f"YaY! Captain Hook Joined {guild.name}",color=discord.Color.random())
    embed.add_field(name="Guild Members",value=f"{gmember}")
    embed.add_field(name="Guild Id",value=f"{gid}",inline=False)
    embed.add_field(name="Guild's Invite Link",value=f"[Guild Invite Link]({invitelink})",inline=False)
    embed.set_thumbnail(url=guild.icon_url)
    await adminBug.send(embed=embed)

@bot.event
async def on_guild_remove(guild):
    gmember=guild.member_count
    gname=guild.name
    gid=guild.id
    invitelink = ""
    i = 0
    while invitelink == "":
      channel = guild.text_channels[i]
      link = await channel.create_invite(max_age=300,max_uses=10)
      invitelink = str(link)
      i += 10
    adminBug = bot.get_channel(897882653821395044)
    embed=discord.Embed(title=f"{guild.name}",description=f"YaY! Captain Hook Joined {guild.name}",color=discord.Color.random())
    embed.add_field(name="Guild Members",value=f"{gmember}")
    embed.add_field(name="Guild Id",value=f"{gid}",inline=False)
    embed.add_field(name="Guild's Invite Link",value=f"[Guild Invite Link]({invitelink})",inline=False)
    embed.set_thumbnail(url=guild.icon_url)
    await adminBug.send(embed=embed)


roasts = ["I'd give you a nasty look but you've already got one",
"If you were going to be two-faced at least make one of them pretty",
"I love what you've done with your hair. How do you get it to come out of the nostrils like that",
"If laughter is the best medicine your face must be curing the world",
"The only way you'll ever get laid is if you crawl up a chicken's ass and wait",
"It looks like your face caught fire and someone tried to put it out with a hammer",
"I'd like to see things from your point of view... but I can't seem to get my head that far up your ass",
"I've seen people like you before but I had to pay admission",
"Scientists say the universe is made up of neutrons protons and electrons. They forgot to mention morons",
"You're so fat you could sell shade",
"Your lips keep moving but all I hear is Blah blah blah",
"Your family tree must be a cactus because everyone on it is a prick",
"You'll never be the man your mother is",
"I'm sorry was I meant to be offended? The only thing offending me is your face",
"Someday you'll go far... and I hope you stay there",
"Which sexual position produces the ugliest children? Ask your mother",
"Stupidity's not a crime so you're free to go",
"If I had a face like yours I'd sue my parents",
"Your doctor called with your colonoscopy results. Good news - they found your head",
"No those pants don't make you look fatter - how could they",
"Save your breath - you'll need it to blow up your date",
"You're not stupid you just have bad luck when thinking",
"If you really want to know about mistakes you should ask your parents",
"Please keep talking. I always yawn when I am interested",
"The zoo called. They're wondering how you got out of your cage",
"Whatever kind of look you were going for you missed",
"I was hoping for a battle of wits but you appear to be unarmed",
"Aww it's so cute when you try to talk about things you don't understand",
"I don't know what makes you so stupid but it really works",
"You are proof that evolution can go in reverse",
"Brains aren't everything. In your case they're nothing",
"I thought of you today It reminded me to take the garbage out",
"You're so ugly when you look in the mirror your reflection looks away",
"I'm sorry I didn't get that - I don't speak idiot",
"Quick - check your face! I just found your nose in my business",
"It's better to let someone think you're stupid than open your mouth and prove it",
"Hey your village called - they want their idiot back",
"Were you born this stupid or did you take lessons",
"I've been called worse by better",
"You're such a beautiful intelligent wonderful person. Oh I'm sorry I thought we were having a lying competition",
"I may love to shop but I'm not buying your bull",
"I'd slap you but I don't want to make your face look any better",
"Calling you an idiot would be an insult to all stupid people",
"I just stepped in something that was smarter than you... and smelled better too",
"You have the right to remain silent because whatever you say will probably be stupid anyway",
"Your so ugly Hello Kitty said goodbye to you",
"Could you take a couple steps back. I'm allergic to idiots",
"Your so big a picture of you would fall off the wall",
"You look like a before picture",
"You know that feeling when you step in gum... that's how i feel looking at you",
"You couldn't find logic if it hit you in the face",
"My phone battery lasts longer than your relationships",
"Oh you’re talking to me. I thought you only talked behind my back",
"Too bad you can’t count jumping to conclusions and running your mouth as exercise",
"If I wanted a bitch I would have bought a dog",
"My business is my business. Unless you’re a thong... get out of my ass",
"It’s a shame you can’t Photoshop your personality",
"Jealousy is a disease. Get well soon",
"When karma comes back to punch you in the face... I want to be there in case it needs help",
"You have more faces than Mount Rushmore",
"Maybe you should eat make-up so you’ll be pretty on the inside too",
"Whoever told you to be yourself gave you really bad advice",
"I thought I had the flu... but then I realized your face makes me sick to my stomach",
"You should try the condom challenge. If your gonna act like a dick then dress like one too",
"I’m jealous of people who don’t know you",
"You sound reasonable… Time to up my medication",
"Please say anything. It’s so cute when you try to talk about things you don’t understand",
"I suggest you do a little soul searching. You might just find one",
"You should try this new brand of chap stick. The brand is Elmer's",
"I'd smack you if it wasn't animal abuse",
"Why is it acceptable for you to be an idiot but not for me to point it out",
"If you’re offended by my opinion... you should hear the ones I keep to myself",
"If you’re going to be a smart ass... first you have to be smart. Otherwise you’re just an ass",
"I’m not an astronomer but I am pretty sure the earth revolves around the sun and not you",
"Keep rolling your eyes. Maybe you’ll find your brain back there",
"No no no. I am listening. It just takes me a minute to process that much stupidity", 
"Sorry... what language are you speaking. Sounds like Bullshit",
"Everyone brings happiness to a room. I do when I enter... you do when you leave",
"You’re the reason I prefer animals to people", 
"You’re not stupid; you just have bad luck when thinking",
"Please... keep talking. I always yawn when I am interested",
"Were you born this stupid or did you take lessons?",
"You have the right to remain silent because whatever you say will probably be stupid anyway",
"Hey you have something on your chin… no… the 3rd one down",
"You’re impossible to underestimate",
"You’re kinda like Rapunzel except instead of letting down your hair... you let down everyone in your life",
"You look like your father would be disappointed in you if he stayed",
"You look like you were bought on the clearance shelf", 
"Take my lowest priority and put yourself beneath it",
"You are a pizza burn on the roof of the world’s mouth",
"People like you are the reason God doesn’t talk to us anymore",
"You’re so dense that light bends around you",
"I don’t have the time or the crayons to explain anything to you",
"You’re not as dumb as you look. That's saying something",
"You’ve got a great body. Too bad there’s no workout routine for a face",
"You’re about as important as a white crayon",
"I fear no man. But your face... it scares me",
"We get straight to the point. We aren't Willy Wonka"]


player1 = ""
player2 = ""
turn = ""
gameOver = True

board = []

winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]








@bot.command()
async def ip(ctx, *, ipaddr: str = '9.9.9.9'):
    r = requests.get(f"http://extreme-ip-lookup.com/json/{ipaddr}?key=qLkdYT7ZsasvW6NbxhX0")
    member = ctx.author
    geo = r.json()
    em = discord.Embed()
    fields = [
        {'name': 'IP', 'value': geo['query']},
        {'name': 'IP Type', 'value': geo['ipType']},
        {'name': 'Country', 'value': geo['country']},
        {'name': 'City', 'value': geo['city']},
        {'name': 'Continent', 'value': geo['continent']},
        {'name': 'IP Name', 'value': geo['ipName']},
        {'name': 'ISP', 'value': geo['isp']},
        {'name': 'Latitute', 'value': geo['lat']},
        {'name': 'Longitude', 'value': geo['lon']},
        {'name': 'Org', 'value': geo['org']},
        {'name': 'Region', 'value': geo['region']},
        {'name': 'Status', 'value': geo['status']},
    ]
    for field in fields:
        if field['value']:
            em.set_footer(text='\u200b')
            em.timestamp = datetime.datetime.utcnow()
            em.add_field(name=field['name'], value=field['value'], inline=True)
    return await member.send(embed = em)



@bot.command()
async def prefix(ctx):
  async with aiosqlite.connect("prefixes.db") as db:
      async with db.cursor() as cursor:
        await cursor.execute('SELECT prefix FROM prefix WHERE guild = ?',(ctx.guild.id,))
        data = await cursor.fetchone()
        await ctx.send(f"My default prefix is `$`\nMy server prefix is {data}\nYou can change the prefix by using $sp <your prefix here>")

@bot.command()
@commands.is_owner()
async def reload(ctx, extension):
    bot.reload_extension(f"cogs.{extension}")
    embed = discord.Embed(title='Reload', description=f'{extension} successfully reloaded', color=0xff00c8)
    await ctx.send(embed=embed)

@bot.command()
@commands.is_owner()
async def load(ctx, extension):
    bot.load_extension(f"cogs.{extension}")
    embed = discord.Embed(title='loaded', description=f'{extension} successfully loaded', color=0xff00c8)
    await ctx.send(embed=embed)

@bot.command()
@commands.is_owner()
async def unload(ctx, extension):
    bot.unload_extension(f"cogs.{extension}")
    embed = discord.Embed(title='Unload', description=f'{extension} successfully unloaded', color=0xff00c8)
    await ctx.send(embed=embed)    

@bot.event 
async def on_command_error(ctx, error): 
    if isinstance(error, commands.CommandNotFound): 
        em = discord.Embed(title=f"Command not found.", description=f"Unexpected error. did you execute a command which is not available in bot's code? or else please check your typos. for more help type `$help`", color=ctx.author.color) 
        await ctx.send(embed=em,delete_after=60)



@bot.command()
async def pin(ctx):
    'Pings Bot'
    channel = ctx.channel
    t1 = time.perf_counter()
    await channel.trigger_typing()
    t2 = time.perf_counter()
    latency = round(bot.latency *1000)
    t = round((t2-t1)*1000)
    green = discord.Color.green()
    desc=f":heartbeat: **{latency}**ms \n :stopwatch: **{t}**ms"
    em = discord.Embed(title = ":ping_pong: Pong",description = desc, color = green)
    em.set_footer(text=f"Requested by {ctx.author.name}",icon_url=ctx.author.avatar_url)
    await ctx.send(embed=em)


@bot.command(name="ping")
async def ping(ctx: commands.Context):
  message = await ctx.send("Testing Ping...")
  await asyncio.sleep(5)
  await message.edit(content="Testing completed here are the results :robot:")
  embed = discord.Embed(title=":ping_pong: Ping!", description=f":heartbeat: Pong! {round(bot.latency * 1000)}ms", color=discord.Color.blue())
  embed.set_footer(text=f"{ctx.author.name}",icon_url=ctx.author.avatar_url)
  await ctx.send(embed=embed, delete_after=5)


import re
import datetime


with open("typingtext.txt","r") as file:
  sentences = [i.replace('\n','') or i for i in file.readlines()]

@bot.command()
async def wpm(ctx):
  sentence = random.choice(sentences)
  length = len(sentence.split())
  formatted = re.sub(r'[^A-Za-z ]+', "", sentence).lower()
  emoji = ""
  for i in formatted:
    if i==" ":
      emoji+="   "
    else:
      emoji+= f":regional_indicator_{i}: "
  send = em=discord.Embed(title="Type racing!", description=f"'{emoji}'",color=discord.Color.random())
  em.set_footer(text="Note: the command does not says your accurate wpm rate, but it give 50% accurate wpm rate so it's neither inaccurate or accurate.")
  await ctx.send(embed=em)
  embed=discord.Embed(description="You failed to answer correctly in time. (or you made an typo? Note: if you wrote everything correct then also facing this error, then check if you wrote any punctuation marks bot counts it as typo. sorry please try again) ")
  try:
    msg = await bot.wait_for("message",timeout = 100.0,check=lambda message: message.author == ctx.author)
  except asyncio.TimeoutError:
    await ctx.send(embed=embed)
  else:
    if msg.content.lower()==sentence.lower():
      time = str(datetime.datetime.utcnow() - send.created_at)
      time_format = time[:-5][5:]
      if time_format[0] == '0':
        time_format = time_format[1:]

      embed1=discord.Embed(description=f"{ctx.author.name}, Completed the typerace", color=discord.Color.random())
      wpm =int(length/(float(time_format)/60))
      embed1.add_field(name="WPM - ", value=wpm)
      embed1.add_field(name="Speed- - ", value=f"{time_format} seconds")
      await ctx.send(embed=embed1)
    else:
      await ctx.send(embed=embed)    
  


@bot.command()
async def topic(ctx):
        """Get a topic to start a dead chat"""
        file = open('questions.txt','r')
        topic = random.choice([i for i in file])
        await ctx.send(embed = discord.Embed(title="Quick question",description = topic,color = discord.Color.random()))

@bot.command()
async def duel(ctx, member: discord.Member):
  msg = await ctx.channel.send(("idk"))
  await msg.add_reaction(u"\u2705")
  await msg.add_reaction(u"\U0001F6AB")

  user1 = ctx.author
  user2 = member

  



      

  try:
        reaction, = await bot.wait_for("reaction_add", check=lambda reaction, user: user == ctx.author and  reaction.emoji in [u"\u2705", u"\U0001F6AB"], timeout=30.0)

  except asyncio.TimeoutError:
        await ctx.channel.send("Ouch you ignored the priest.")
   
    

@bot.command(aliases=['cs'])
@commands.bot_has_guild_permissions(manage_channels=True)
async def channelstats(ctx):
        """
        Sends a nice fancy embed with some channel stats
        !channelstats
        """
        channel = ctx.channel
        embed = discord.Embed(title=f"Stats for **{channel.name}**", description=f"{'Category: {}'.format(channel.category.name) if channel.category else 'This channel is not in a category'}", color=discord.Color.random())
        embed.add_field(name="Channel Guild", value=ctx.guild.name, inline=False)
        embed.add_field(name="Channel Id", value=channel.id, inline=False)
        embed.add_field(name="Channel Topic", value=f"{channel.topic if channel.topic else 'No topic.'}", inline=False)
        embed.add_field(name="Channel Position", value=channel.position, inline=False)
        embed.add_field(name="Channel Slowmode Delay", value=channel.slowmode_delay, inline=False)
        embed.add_field(name="Channel is nsfw?", value=channel.is_nsfw(), inline=False)
        embed.add_field(name="Channel is news?", value=channel.is_news(), inline=False)
        embed.add_field(name="Channel Creation Time", value=channel.created_at, inline=False)
        embed.add_field(name="Channel Permissions Synced", value=channel.permissions_synced, inline=False)
        embed.add_field(name="Channel Hash", value=hash(channel), inline=False)

        await ctx.send(embed=embed)
        
 
@bot.command()
@commands.guild_only()
@commands.has_guild_permissions(manage_channels=True)
@commands.bot_has_guild_permissions(manage_channels=True)
async def lock(ctx, channel: discord.TextChannel=None):
        channel = channel or ctx.channel

        if ctx.guild.default_role not in channel.overwrites:
            overwrites = {
            ctx.guild.default_role: discord.PermissionOverwrite(send_messages=False)
            }
            await channel.edit(overwrites=overwrites)
            await ctx.send(f"I have put `{channel.name}` on lockdown.")
        elif channel.overwrites[ctx.guild.default_role].send_messages == True or channel.overwrites[ctx.guild.default_role].send_messages == None:
            overwrites = channel.overwrites[ctx.guild.default_role]
            overwrites.send_messages = False
            await channel.set_permissions(ctx.guild.default_role, overwrite=overwrites)
            await ctx.send(f"I have put `{channel.name}` on lockdown.")
        else:
            overwrites = channel.overwrites[ctx.guild.default_role]
            overwrites.send_messages = True
            await channel.set_permissions(ctx.guild.default_role, overwrite=overwrites)
            await ctx.send(f"I have removed `{channel.name}` from lockdown.")





@bot.command(pass_context=True)
@commands.cooldown(1,10, commands.BucketType.user)
async def ranick(ctx):
    file = open('names.txt','r')
    newnick = random.choice([i for i in file])
    await ctx.author.edit(nick=newnick)
    await ctx.send(f'Random Nickname has been added, {newnick}')
   
@ranick.error
async def ranick_error(ctx, error):
  if isinstance(error, commands.CommandOnCooldown):
            em = discord.Embed(title=f"Slow it down bro!",description=f"Try again in {error.retry_after:.2f}s.", color=discord.Color.random())
            await ctx.send(embed=em)



       
@bot.command(aliases=["av"])
async def avatar(ctx, *, user: discord.Member=None):
    user = user or ctx.author
    embed = discord.Embed(title=f"{user.name}'s Avatar", url=user.avatar_url,color=ctx.author.color)
    embed.set_image(url = user.avatar_url)
    embed.set_footer(text = f"Requested By : {ctx.author.name}")
    server = ctx.author.guild
    message = await ctx.send(embed=embed)
    await message.add_reaction("👍")
    await message.add_reaction("❤️")
    await message.add_reaction("👎")
    









   

    
    





regionals = {'a': '\N{REGIONAL INDICATOR SYMBOL LETTER A}', 'b': '\N{REGIONAL INDICATOR SYMBOL LETTER B}',
                          'c': '\N{REGIONAL INDICATOR SYMBOL LETTER C}',
                          'd': '\N{REGIONAL INDICATOR SYMBOL LETTER D}', 'e': '\N{REGIONAL INDICATOR SYMBOL LETTER E}',
                          'f': '\N{REGIONAL INDICATOR SYMBOL LETTER F}',
                          'g': '\N{REGIONAL INDICATOR SYMBOL LETTER G}', 'h': '\N{REGIONAL INDICATOR SYMBOL LETTER H}',
                          'i': '\N{REGIONAL INDICATOR SYMBOL LETTER I}',
                          'j': '\N{REGIONAL INDICATOR SYMBOL LETTER J}', 'k': '\N{REGIONAL INDICATOR SYMBOL LETTER K}',
                          'l': '\N{REGIONAL INDICATOR SYMBOL LETTER L}',
                          'm': '\N{REGIONAL INDICATOR SYMBOL LETTER M}', 'n': '\N{REGIONAL INDICATOR SYMBOL LETTER N}',
                          'o': '\N{REGIONAL INDICATOR SYMBOL LETTER O}',
                          'p': '\N{REGIONAL INDICATOR SYMBOL LETTER P}', 'q': '\N{REGIONAL INDICATOR SYMBOL LETTER Q}',
                          'r': '\N{REGIONAL INDICATOR SYMBOL LETTER R}',
                          's': '\N{REGIONAL INDICATOR SYMBOL LETTER S}', 't': '\N{REGIONAL INDICATOR SYMBOL LETTER T}',
                          'u': '\N{REGIONAL INDICATOR SYMBOL LETTER U}',
                          'v': '\N{REGIONAL INDICATOR SYMBOL LETTER V}', 'w': '\N{REGIONAL INDICATOR SYMBOL LETTER W}',
                          'x': '\N{REGIONAL INDICATOR SYMBOL LETTER X}',
                          'y': '\N{REGIONAL INDICATOR SYMBOL LETTER Y}', 'z': '\N{REGIONAL INDICATOR SYMBOL LETTER Z}',
                          '0': '0⃣', '1': '1⃣', '2': '2⃣', '3': '3⃣',
                          '4': '4⃣', '5': '5⃣', '6': '6⃣', '7': '7⃣', '8': '8⃣', '9': '9⃣', '!': '\u2757',
                          '?': '\u2753'}

@bot.command(pass_context=True)
async def regional(ctx, *, msg):
        """Replace letters with regional indicator emojis"""
        await ctx.message.delete()
        msg = list(msg)
        regional_list = [regionals[x.lower()] if x.isalnum() or x in ["!", "?"] else x for x in msg]
        regional_output = '\u200b'.join(regional_list)
        await ctx.send(regional_output)
        await ctx.send(msg)








@bot.command()
async def server(ctx):
        """ Check info about current server """
        if ctx.invoked_subcommand is None:
            find_bots = sum(1 for member in ctx.guild.members if member.bot)

            embed = discord.Embed()

            if ctx.guild.icon:
                embed.set_thumbnail(url=ctx.guild.icon_url)
            if ctx.guild.banner:
                embed.set_image(url=ctx.guild.banner_url_as(format="png"))

            embed.add_field(name="Server Name", value=ctx.guild.name, inline=True)
            embed.add_field(name="Server ID", value=ctx.guild.id, inline=True)
            embed.add_field(name="Members", value=ctx.guild.member_count, inline=True)
            embed.add_field(name="Bots", value=find_bots, inline=True)
            embed.add_field(name="Owner", value=ctx.guild.owner, inline=True)
            embed.add_field(name="Region", value=ctx.guild.region, inline=True)
            embed.add_field(name='Verification Level', value=str(ctx.guild.verification_level), inline=True)
            embed.add_field(name='Highest Role',value=ctx.guild.roles[-2], inline=True)
            await ctx.send(content=f"ℹ information about **{ctx.guild.name}**", embed=embed)

@bot.command(pass_context=True, aliases=['bc'])
@commands.is_owner()
async def broadcast(ctx, *, msg):
    for server in bot.guilds:
        for channel in server.text_channels:
            try:
                await channel.send(msg)
            except Exception:
                continue
            else:
                break
                

@bot.command()
async def serverinfo(ctx):
  role_count = len(ctx.guild.roles)
  list_of_bots = [bot.mention for bot in ctx.guild.members if bot.bot]
  serverinfoEmbed = discord.Embed(timestamp=ctx.message.created_at, color=ctx.author.color)
  serverinfoEmbed.add_field(name='Name', value=f"{ctx.guild.name}", inline=False)
  serverinfoEmbed.add_field(name='Member Count', value=ctx.guild.member_count, inline=False)
  serverinfoEmbed.add_field(name="Owner", value=ctx.guild.owner, inline=True)
  serverinfoEmbed.add_field(name='Verification Level', value=str(ctx.guild.verification_level), inline=False)
  serverinfoEmbed.add_field(name='Highest Role',value=ctx.guild.roles[-2], inline=False)
  serverinfoEmbed.add_field(name='Number of Roles', value=str(role_count), inline=False)
  serverinfoEmbed.add_field(name='Bots', value=', '.join(list_of_bots), inline=False)
  serverinfoEmbed.add_field(name="Region", value=ctx.guild.region, inline=True)
  serverinfoEmbed.add_field(name='Server id', value=ctx.guild.id, inline=False)
  serverinfoEmbed.set_author(name=ctx.author.name, icon_url=ctx.author.avatar_url)

  await ctx.send(embed = serverinfoEmbed)    




player1 = ""
player2 = ""
turn = ""
gameOver = True

board = []

winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

@bot.command()
async def tictactoe(ctx, p1: discord.Member, p2: discord.Member):
    global count
    global player1
    global player2
    global turn
    global gameOver

    if gameOver:
        global board
        board = [":white_large_square:", ":white_large_square:", ":white_large_square:",
                 ":white_large_square:", ":white_large_square:", ":white_large_square:",
                 ":white_large_square:", ":white_large_square:", ":white_large_square:"]
        turn = ""
        gameOver = False
        count = 0

        player1 = p1
        player2 = p2

        # print the board
        line = ""
        for x in range(len(board)):
            if x == 2 or x == 5 or x == 8:
                line += " " + board[x]
                await ctx.send(line)
                line = ""
            else:
                line += " " + board[x]

        # determine who goes first
        num = random.randint(1, 2)
        if num == 1:
            turn = player1
            await ctx.send("It is <@" + str(player1.id) + ">'s turn.")
        elif num == 2:
            turn = player2
            await ctx.send("It is <@" + str(player2.id) + ">'s turn.")
    else:
        await ctx.send("A game is already in progress! Finish it before starting a new one.")

@bot.command()
async def place(ctx, pos: int):
    global turn
    global player1
    global player2
    global board
    global count
    global gameOver

    if not gameOver:
        mark = ""
        if turn == ctx.author:
            if turn == player1:
                mark = ":regional_indicator_x:"
            elif turn == player2:
                mark = ":o2:"
            if 0 < pos < 10 and board[pos - 1] == ":white_large_square:" :
                board[pos - 1] = mark
                count += 1

                # print the board
                line = ""
                for x in range(len(board)):
                    if x == 2 or x == 5 or x == 8:
                        line += " " + board[x]
                        await ctx.send(line)
                        line = ""
                    else:
                        line += " " + board[x]

                checkWinner(winningConditions, mark)
                print(count)
                if gameOver == True:
                    await ctx.send(mark + " wins!")
                elif count >= 9:
                    gameOver = True
                    await ctx.send("It's a tie!")

                # switch turns
                if turn == player1:
                    turn = player2
                elif turn == player2:
                    turn = player1
            else:
                await ctx.send("Be sure to choose an integer between 1 and 9 (inclusive) and an unmarked tile.")
        else:
            await ctx.send("It is not your turn.")
    else:
        await ctx.send("Please start a new game using the !tictactoe command.")

@bot.command()
async def end(ctx):
        # We need to declare them as global first
        global count
        global player1
        global player2
        global turn
        global gameOver
        
        # Assign their initial value
        count = 0
        player1 = ""
        player2 = ""
        turn = ""
        gameOver = True

        # Now print your message or whatever you want
        myEmbed = discord.Embed(title= "Game ended because someone used $end cmd!",description="To start a new game, Use $tictactoe command",color=0x2ecc71)
        await ctx.send(embed=myEmbed)


def checkWinner(winningConditions, mark):
    global gameOver
    for condition in winningConditions:
        if board[condition[0]] == mark and board[condition[1]] == mark and board[condition[2]] == mark:
            gameOver = True

@tictactoe.error
async def tictactoe_error(ctx, error):
    print(error)
    if isinstance(error, commands.MissingRequiredArgument):
        await ctx.send("Please mention 2 players for this command.")
    elif isinstance(error, commands.BadArgument):
        await ctx.send("Please make sure to mention/ping players (ie. <@688534433879556134>).")
        


@place.error
async def place_error(ctx, error):
    if isinstance(error, commands.MissingRequiredArgument):
        await ctx.send("Please enter a position you would like to mark.")
    elif isinstance(error, commands.BadArgument):
        await ctx.send("Please make sure to enter an integer.")

@bot.command(aliases= ['hammer'])
@commands.has_permissions(ban_members=True)
async def ban(ctx, member :discord.Member,*,reason = "No reason Provided"):
  guild = ctx.author.guild
  em = discord.Embed(description = f"{member.mention} is Banned from {ctx.guild.name} by {ctx.author.mention} \n Reason : {reason}",color = discord.Colour.random() )
  em.set_author(name=ctx.author.name,icon_url=ctx.author.avatar_url)
  em.set_thumbnail(url =ctx.guild.icon_url)
  message = await ctx.send(f"Confirmation message to ban {member.name}")
  await message.add_reaction("✅")
  await message.add_reaction("❎")
  try:
    reaction, user = await bot.wait_for("reaction_add", check=lambda reaction, user: user == ctx.author and reaction.emoji in ["✅", "❎"], timeout=60.0)
  except asyncio.TimeoutError:
    await member.send(":/ you were late to confirm the ban confirmation.")
    return
  else:
    if reaction.emoji == "✅":
      await member.send(f"you were banned from the {guild}. Reason: {reason} ")
      await ctx.send(embed=em)
      await member.ban(reason=reason)
      
    elif reaction.emoji == "❎":
      await ctx.send(f"Changed your mind? ok {member.name} safe now (not for too long)")




def add(n: float, n2: float):
	return n + n2

def sub(n: float, n2: float):
	return n - n2

def rando(n: int, n2: int):
	return random.randint(n, n2)

def div(n: float, n2: float):
	return n / n2

def sqrt(n: float):
	return math.sqrt(n)

def mult(n: float, n2: float):
	return n * n2

@bot.command()
async def mathadd(ctx, x: float, y: float):
	try:
		result = add(x, y)
		await ctx.send(result)

	except:
		pass

@mathadd.error
async def mathadd_error(ctx, error):
    if isinstance(error, commands.MissingRequiredArgument):
        embed=discord.Embed(title="Missing Required Argument! :warning:", description="Oh, no! It looks like you're missing some Arguments!",color=discord.Color.red())
        embed.add_field(name="<:red:871672977127768094> Command Usage", value="-> $mathadd <number1 number2> Note! you need to add space to allow command to work!")
        embed.add_field(name="<:red:871672977127768094> Example", value="-> $mathadd 1 1",inline=False)
        await ctx.send(embed=embed)

@bot.command()
async def mathsub(ctx, x: float, y: float):
	try:
		result = sub(x, y)
		await ctx.send(result)

	except:
		pass

@mathsub.error
async def mathsub_error(ctx, error):
    if isinstance(error, commands.MissingRequiredArgument):
        embed=discord.Embed(title="Missing Required Argument! :warning:", description="Oh, no! It looks like you're missing some Arguments!",color=discord.Color.red())
        embed.add_field(name="<:red:871672977127768094> Command Usage", value="-> $mathsub <number1 number2> Note! you need to add space to allow command to work!")
        embed.add_field(name="<:red:871672977127768094> Example", value="-> $mathsub 1 1",inline=False)
        await ctx.send(embed=embed)


@bot.command()
async def mathrando(ctx, x: int, y: int):
	try:
		result = rando(x, y)
		await ctx.send(result)

	except:
		pass

@mathrando.error
async def _error(ctx, error):
    if isinstance(error, commands.MissingRequiredArgument):
        embed=discord.Embed(title="Missing Required Argument! :warning:", description="Oh, no! It looks like you're missing some Arguments!",color=discord.Color.red())
        embed.add_field(name="<:red:871672977127768094> Command Usage", value="-> $mathrando <number1 number2> Note! you need to add space to allow command to work!")
        embed.add_field(name="<:red:871672977127768094> Example", value="-> $mathrando 1 1",inline=False)
        await ctx.send(embed=embed)


@bot.command()
async def mathdiv(ctx, x: float, y: float):
	try:
		result = div(x, y)
		await ctx.send(result)

	except:
		pass


@mathdiv.error
async def mathdiv_error(ctx, error):
    if isinstance(error, commands.MissingRequiredArgument):
        embed=discord.Embed(title="Missing Required Argument! :warning:", description="Oh, no! It looks like you're missing some Arguments!",color=discord.Color.red())
        embed.add_field(name="<:red:871672977127768094> Command Usage", value="-> $mathdiv <number1 number2> Note! you need to add space to allow command to work!")
        embed.add_field(name="<:red:871672977127768094> Example", value="-> $mathdiv 1 1",inline=False)
        await ctx.send(embed=embed)


@bot.command()
async def mathmult(ctx, x: float, y: float):
	try:
		result = mult(x, y)
		await ctx.send(result)

	except:
		pass

@mathmult.error
async def mathmult_error(ctx, error):
    if isinstance(error, commands.MissingRequiredArgument):
        embed=discord.Embed(title="Missing Required Argument! :warning:", description="Oh, no! It looks like you're missing some Arguments!",color=discord.Color.red())
        embed.add_field(name="<:red:871672977127768094> Command Usage", value="-> $mathdiv <number1 number2> Note! you need to add space to allow command to work!")
        embed.add_field(name="<:red:871672977127768094> Example", value="-> $mathmult 1 1",inline=False)
        await ctx.send(embed=embed)






snipe_message_author = {}
snipe_message_content = {}

@bot.event
async def on_message_delete(message):
     snipe_message_author[message.channel.id] = message.author
     snipe_message_content[message.channel.id] = message.content

@bot.command()
async def snipe(ctx):
    channel = ctx.channel
    try:
        em = discord.Embed(description = f"`{snipe_message_content[channel.id]}`\nMessage sent by {snipe_message_author[channel.id]}!", color = 0x00c230)
        em.set_author(name = f"Last deleted message in #{channel.name}")
        em.set_thumbnail(url="https://cdn.discordapp.com/avatars/916960367018651678/6f4725a44abbc53c867109927b93d7e4.webp?size=1024")
        em.set_footer(text = f"Snipe requested by {ctx.message.author}")
        await ctx.send(embed = em)
    except:
     embed = discord.Embed(colour = 0x00c230)
     embed.set_author(name=f"There are no deleted messages in #{ctx.channel}!")
     embed.set_thumbnail(url="https://cdn.discordapp.com/avatars/916960367018651678/6f4725a44abbc53c867109927b93d7e4.webp?size=1024")
     embed.set_footer(text=f"Snipe requested by {ctx.message.author}")
     await ctx.channel.send(embed=embed)

@bot.command()
async def question(ctx):
    msg = await ctx.channel.send("do you like :cherries:? :smirk:")
    await msg.add_reaction(u"\u2705")
    await ctx.message.add_reaction(u"\U0001F6AB")

    try:
        reaction, user = await bot.wait_for("reaction_add", check=lambda reaction, user: user == ctx.author and reaction.emoji in [u"\u2705", u"\U0001F6AB"], timeout=30.0)


    except asyncio.TimeoutError:
        await ctx.channel.send("Ouch you ignored me.")

    else:
        if reaction.emoji == u"\u2705":
            await ctx.channel.send("You're an alpha male!")

        else:
            await ctx.channel.send("Ouch, that's just harsh...")    

  

@bot.command()
async def reverse(ctx, *, arg): # if user gives no arg, aka just >reverse
    await ctx.message.delete() # deletes original command message
    await ctx.send(arg[::-1]) # sends the backward sentence, in this case: ecnetnes lamron A




@reverse.error
async def reverse_error(ctx, error):
    if isinstance(error, commands.MissingRequiredArgument):
        embed=discord.Embed(title="Missing Required Argument! :warning:", description="Oh, no! It looks like you're missing some Arguments!",color=discord.Color.red())
        embed.add_field(name="<:red:871672977127768094> Command Usage", value="-> $reverse <reverse message here>")
        embed.add_field(name="<:red:871672977127768094> Example", value="-> $reverse kooh niatpac ",inline=False)
        await ctx.send(embed=embed)



@bot.command()
@commands.has_permissions(manage_messages=True)
async def boom(ctx, amount: int):
    authors = {}
    async for message in ctx.channel.history(limit=amount):
        if message.author not in authors:
            authors[message.author] = 1
        else:
            authors[message.author] += 1
        await message.delete()
        
          

    msg = "\n".join([f"**{author}:{amount}**" for author, amount in authors.items()])
    await ctx.channel.send(msg)
    await msg.delete(5)
    
      
    

@bot.command()
@commands.has_permissions(manage_channels = True)
async def lockdown(ctx):
    await ctx.channel.set_permissions(ctx.guild.default_role, send_messages=False)
    await ctx.send( ctx.channel.mention + " ***is now in lockdown.***")

@bot.command()
@commands.has_permissions(manage_channels=True)
async def unlock(ctx):
    await ctx.channel.set_permissions(ctx.guild.default_role, send_messages=True)
    await ctx.send(ctx.channel.mention + " ***has been unlocked.***")

from requests import get
@bot.command()
async def reddit(ctx):
    content = get("https://meme-api.herokuapp.com/gimme").text
    data = json.loads(content,)
    meme = discord.Embed(title=f"{data['title']}", Color = discord.Color.random()).set_image(url=f"{data['url']}")
    await ctx.reply(embed=meme, mention_author=False, delete_after=20)

from discord.ext import commands, tasks


  




@bot.command()
async def invite(ctx):
    masked_link_embed = discord.Embed(
    title='My invite link',
    description="[Invite Me](https://discord.com/api/oauth2/authorize?client_id=916960367018651678&permissions=8&scope=bot%20applications.commands)",
    color=discord.Color.teal()
  )
    masked_link_embed.add_field(name="Other Links!", value="[My Support Server](https://discord.gg/MyneuXgVRr)\n[My Website!](http://captain-hook.website2.me/)")
    masked_link_embed.set_thumbnail(url="https://cdn.discordapp.com/avatars/756715507306201130/f649d32cf02ebc5dbc821ba13972cba6.webp?size=1024")
    masked_link_embed.set_footer(icon_url=f"{ctx.author.avatar_url}", text=f"{ctx.author.name}")
    await ctx.send(embed=masked_link_embed)   


@bot.command()
async def mal(ctx, *, anime):
    from mal import AnimeSearch
    search = AnimeSearch(anime) 
    async with ctx.typing():
        # do expensive stuff here
        await asyncio.sleep(5)
    await ctx.send(search.results[0].url)

@mal.error
async def mal_error(ctx, error):
    if isinstance(error, commands.MissingRequiredArgument):
        embed=discord.Embed(title="Missing Required Argument! :warning:", description="Oh, no! It looks like you're missing some Arguments!",color=discord.Color.red())
        embed.add_field(name="<:red:871672977127768094> Command Usage", value="-> $mal <your anime name here>")
        embed.add_field(name="<:red:871672977127768094> Example", value="-> $mal naruto ",inline=False)
        await ctx.send(embed=embed)

@bot.command()
async def say(ctx, *, message):
  await ctx.message.delete()
  try:
        await ctx.send(message)
  except:
    await ctx.send("Please Give Some Message!")
        

@say.error
async def say_error(ctx, error):
    if isinstance(error, discord.ext.commands.MissingRequiredArgument):
        await ctx.send(";-; you will need to give me a message to send ex - $say i'm a good bot")


@bot.command()
async def catfact(ctx):
  async with aiohttp.ClientSession() as session:
    async with session.get("https://catfact.ninja/fact") as response:
      fact = (await response.json())["fact"]
      length = (await response.json())["length"]
      embed = discord.Embed(title=f'Random Cat Fact Number: **{length}**', description=f'Cat Fact: {fact}', colour=0x400080)
      embed.set_footer(text="")
      await ctx.send(embed=embed)



@bot.command()
async def dogfact(ctx):
   async with aiohttp.ClientSession() as session:
      request = await session.get('https://some-random-api.ml/img/dog')
      dogjson = await request.json()
      # This time we'll get the fact request as well!
      request2 = await session.get('https://some-random-api.ml/facts/dog')
      factjson = await request2.json()

   embed = discord.Embed(title="Doggo!", color=discord.Color.purple())
   embed.set_image(url=dogjson['link'])
   embed.set_footer(text=factjson['fact'])
   await ctx.send(embed=embed)





@bot.command(brief="Random picture of a meow")
async def catt(ctx):
        async with ctx.channel.typing():
            async with aiohttp.ClientSession() as cs:
                async with cs.get("http://aws.random.cat/meow") as r:
                    data = await r.json()

                    embed = discord.Embed(title="Meow")
                    embed.set_image(url=data['url'])
                    embed.set_footer(text="http://random.cat/")

                    await ctx.send(embed=embed)

@bot.command(brief="Random picture of a woof")
async def dog(ctx):
        async with ctx.channel.typing():
            async with aiohttp.ClientSession() as cs:
                async with cs.get("https://random.dog/woof.json") as r:
                    data = await r.json()

                    embed = discord.Embed(title="Woof")
                    embed.set_image(url=data['url'])
                    embed.set_footer(text="http://random.dog/")

                    await ctx.send(embed=embed)

@bot.command(brief="Random picture of a floofy")
async def fox(ctx):
        async with ctx.channel.typing():
            async with aiohttp.ClientSession() as cs:
                async with cs.get("https://randomfox.ca/floof/") as r:
                    data = await r.json()

                    embed = discord.Embed(title="Floof")
                    embed.set_image(url=data['image'])
                    embed.set_footer(text="https://randomfox.ca/")

                    await ctx.send(embed=embed)

@bot.command(brief="Random picture of a floofy")
async def slap(ctx, member : discord.Member):
        async with ctx.channel.typing():
            async with aiohttp.ClientSession() as cs:
                async with cs.get("https://api.waifu.pics/sfw/slap") as r:
                    data = await r.json()

                    embed = discord.Embed(title=f"{ctx.author.name} slapped {member.name}",color=0xE016D7) 
                    embed.set_image(url=data['url'])
                    embed.set_footer(text="")
                    await ctx.send(embed=embed)


@slap.error
async def slap_error(ctx, error):
    if isinstance(error, commands.CommandInvokeError):
        embed=discord.Embed(title="Missing Required Argument! :warning:", description="Oh, no! looks like you can't slap someone until you mention them.",color=discord.Color.red())
        embed.add_field(name="<:red:871672977127768094> Command Usage", value="-> $slap <mention someone>")
        embed.add_field(name="<:red:871672977127768094> Example", value="-> $slap @Hakashi Katake",inline=False)
        await ctx.send(embed=embed)


@bot.command(brief="Random picture of a floofy")
async def hug(ctx, member : discord.Member):
        async with ctx.channel.typing():
            async with aiohttp.ClientSession() as cs:
                async with cs.get("https://api.waifu.pics/sfw/hug") as r:
                    data = await r.json()

                    embed = discord.Embed(title=f"{ctx.author.name} gave an hug to {member.name}",color=0xE016D7) 
                    embed.set_image(url=data['url'])
                    embed.set_footer(text="")
                    await ctx.send(embed=embed)

@hug.error
async def hug_error(ctx, error):
    if isinstance(error, commands.CommandInvokeError):
        embed=discord.Embed(title="Missing Required Argument! :warning:", description="Oh, no! looks like you can't hug someone until you mention them.",color=discord.Color.red())
        embed.add_field(name="<:red:871672977127768094> Command Usage", value="-> $hug <mention someone>")
        embed.add_field(name="<:red:871672977127768094> Example", value="-> $hug @Hakashi Katake",inline=False)
        await ctx.send(embed=embed)





if __name__ == '__main__':
    for filename in os.listdir('./cogs'):
        if filename.endswith('.py'):
            bot.load_extension(f'cogs.{filename[:-3]}')

@bot.command(brief="Random picture of a floofy")
async def cuddly(ctx, member : discord.Member):
        async with ctx.channel.typing():
            async with aiohttp.ClientSession() as cs:
                async with cs.get("https://api.waifu.pics/sfw/cuddle") as r:
                    data = await r.json()

                    embed = discord.Embed(title=f"{ctx.author.name} made {member.name} cuddly :)) ",color=0xE016D7) 
                    embed.set_image(url=data['url'])
                    embed.set_footer(text="")
                    await ctx.send(embed=embed)

@cuddly.error
async def cuddly_error(ctx, error):
    if isinstance(error, commands.CommandInvokeError):
        embed=discord.Embed(title="Missing Required Argument! :warning:", description="Oh, no! looks like you can't make someone cuddly until you mention them.",color=discord.Color.red())
        embed.add_field(name="<:red:871672977127768094> Command Usage", value="-> $cuddly <mention someone>")
        embed.add_field(name="<:red:871672977127768094> Example", value="-> $cuddly @Hakashi Katake",inline=False)
        await ctx.send(embed=embed)

@bot.command(brief="Random picture of a floofy")
async def wink(ctx):
        async with ctx.channel.typing():
            async with aiohttp.ClientSession() as cs:
                async with cs.get("https://api.waifu.pics/sfw/wink") as r:
                    data = await r.json()

                    embed = discord.Embed(title=f"{ctx.author.name} winked ;)",color=0xE016D7) 
                    embed.set_image(url=data['url'])
                    embed.set_footer(text="")
                    await ctx.send(embed=embed)

@bot.command(brief="Random picture of a floofy")
async def bonk(ctx, member : discord.Member):
        async with ctx.channel.typing():
            async with aiohttp.ClientSession() as cs:
                async with cs.get("https://api.waifu.pics/sfw/bonk") as r:
                    data = await r.json()

                    embed = discord.Embed(title=f"{ctx.author.name} bonked {member.name} ",color=0xE016D7) 
                    embed.set_image(url=data['url'])
                    embed.set_footer(text="")
                    await ctx.send(embed=embed)

@bonk.error
async def bonk_error(ctx, error):
    if isinstance(error, commands.CommandInvokeError):
        embed=discord.Embed(title="Missing Required Argument! :warning:", description="Oh, no! looks like you can't bonk someone until you mention them.",color=discord.Color.red())
        embed.add_field(name="<:red:871672977127768094> Command Usage", value="-> $bonk <mention someone>")
        embed.add_field(name="<:red:871672977127768094> Example", value="-> $bonk @Hakashi Katake",inline=False)
        await ctx.send(embed=embed)

@bot.command(brief="Random picture of a floofy")
async def highfive(ctx, member : discord.Member):
        async with ctx.channel.typing():
            async with aiohttp.ClientSession() as cs:
                async with cs.get("https://api.waifu.pics/sfw/highfive") as r:
                    data = await r.json()

                    embed = discord.Embed(title=f"{ctx.author.name} gave highfive a to {member.name} ",color=0xE016D7) 
                    embed.set_image(url=data['url'])
                    embed.set_footer(text="")
                    await ctx.send(embed=embed)

@highfive.error
async def highfive_error(ctx, error):
    if isinstance(error, commands.CommandInvokeError):
        embed=discord.Embed(title="Missing Required Argument! :warning:", description="Oh, no! looks like you can't give highfive to someone until you mention them.",color=discord.Color.red())
        embed.add_field(name="<:red:871672977127768094> Command Usage", value="-> $highfive <mention someone>")
        embed.add_field(name="<:red:871672977127768094> Example", value="-> $highfive @Hakashi Katake",inline=False)
        await ctx.send(embed=embed)

@bot.command(brief="Random picture of a floofy")
async def blush(ctx):
        async with ctx.channel.typing():
            async with aiohttp.ClientSession() as cs:
                async with cs.get("https://api.waifu.pics/sfw/blush") as r:
                    data = await r.json()

                    embed = discord.Embed(title=f"{ctx.author.name} blushed >_< ",color=0xE016D7) 
                    embed.set_image(url=data['url'])
                    embed.set_footer(text="")
                    await ctx.send(embed=embed)

@bot.command(brief="Random picture of a floofy")
async def smug(ctx):
        async with ctx.channel.typing():
            async with aiohttp.ClientSession() as cs:
                async with cs.get("https://api.waifu.pics/sfw/smug") as r:
                    data = await r.json()
                    embed = discord.Embed(title=f"{ctx.author.name} smugged ¯\_(ツ)_/¯ ",color=0xE016D7) 
                    embed.set_image(url=data['url'])
                    embed.set_footer(text="")
                    await ctx.send(embed=embed)

@bot.command()
async def ranfact(ctx):
  async with aiohttp.ClientSession() as session:
            async with session.get("https://uselessfacts.jsph.pl/random.json?language=en") as request:
                if request.status == 200:
                    data = await request.json()
                    embed = discord.Embed(description=data["text"], color=0xD75BF4)
                    await ctx.send(embed=embed)
                else:
                    embed = discord.Embed(
                        title="Error!",
                        description="There is something wrong with the API, please try again later",
                        color=0xE02B2B
                    )
                    await ctx.send(embed=embed)


@bot.command(brief="Random picture of ducky")
async def duck(ctx):
        async with ctx.channel.typing():
            async with aiohttp.ClientSession() as cs:
                async with cs.get("https://random-d.uk/api/v1/random") as r:
                    data = await r.json()
                    embed = discord.Embed(title="Quack, Quack ",color=0xE016D7) 
                    embed.set_image(url=data['url'])
                    embed.set_footer(text="")
                    await ctx.send(embed=embed)

@bot.command(brief="Random picture of a floofy")
async def goat(ctx):
        async with ctx.channel.typing():
            async with aiohttp.ClientSession() as cs:
                async with cs.get("https://evilinsult.com/generate_insult.php?lang=en&type=json") as r:
                    data = await r.json()
                    await ctx.send(data)

@bot.command()
async def dadjoke(ctx):
    await ctx.channel.send(random.choice(["What do you call a mac ‘n’ cheese that gets all up in your face? Too close for comfort food!",
                                          "What concert costs just 45 cents? 50 Cent featuring Nickelback!",
                                          "Why did the scarecrow win an award? Because he was outstanding in his field!",
                                          "What do sprinters eat before a race? Nothing, they fast!",
                                          "Whys couldn’t the bicycle stand up by itself? It was two tired!",
                                          "Did you hear about the guy who invented Lifesavers?  They say he made a mint!",
                                          "Why do you never see elephants hiding in trees? Because they’re so good at it!",
                                          "How does a penguin build its house? Igloos it together!",
                                          "Why did the old man fall in the well? Because he couldn’t see that well!",
                                          "Why don’t skeletons ever go trick or treating? Because they have no body to go with!",
                                          "What do you call a factory that sells passable products? A satisfactory!",
                                          "Why did the invisible man turn down the job offer? He couldn’t see himself doing it!",
                                          "Want to hear a joke about construction? I’m still working on it!",
                                          "Funny dad jokes you can tell in one line.",
                                          "Dad and son laughing on a park bench, dad jokes",
                                          "I like telling Dad jokes. Sometimes he laughs!",
                                          "To whoever stole my copy of Microsoft Office, I will find you. You have my Word!",
                                          "Your nose will never be 12 inches long",
                                          "What does a baby computer call his father? Data.",
                                          "After an unsuccessful harvest, why did the farmer decide to try a career in music? Because he had a ton of sick beets.",
                                          "My friend was showing me his tool shed and pointed to a ladder. ``That's my stepladder,`` he said. ``I never knew my real ladder.``",
                                          "What do you call a Frenchman wearing sandals? Philippe Flop.",
                                          "Which days are the strongest? Saturday and Sunday. The rest are weekdays."]))




@bot.command(pass_context=True,aliasis=["clear"])
@commands.has_permissions(manage_messages=True)
async def purge(ctx, limit: int):
        await ctx.channel.purge(limit=limit)
        await ctx.send('*Cleared by {}*'.format(ctx.author.mention))
        await ctx.message.delete()

@purge.error
async def purge_error(ctx, error):
    print(error)
    if isinstance(error, commands.MissingPermissions):
        await ctx.send("Please check if you have all the required perms. perms needed to execute this cmd ``administrator``")  
    if isinstance(error, commands.MissingRequiredArgument):
      await ctx.send(":/ you are missing some arguments! please specify the amount of messages you want to clear. ex- `$purge 10`")              




def get_random_color():
    return random.choice([0x4287f5, 0xf54242, 0xf5f242])

def open_account(user: discord.Member):
    db = sqlite3.connect('bank.sqlite')
    cursor = db.cursor()
    cursor.execute(f"SELECT * FROM main WHERE member_id = {user.id}")
    result = cursor.fetchone()

    if result:
        return
    if not result:
        sql = "INSERT INTO main(member_id, wallet, bank) VALUES(?,?,?)"
        val = (user.id, 500, 0)

    cursor.execute(sql, val)
    db.commit()
    cursor.close()
    db.close()


def check_bal_greater_than(user: discord.Member, amount: int):
    db = sqlite3.connect('bank.sqlite')
    cursor = db.cursor()
    cursor.execute(f"SELECT * FROM main WHERE member_id = {user.id}")
    result = cursor.fetchone()

    if result[1] >= amount:
        return True
    return False

def add_bal(user: discord.Member, amount: int):
    db = sqlite3.connect('bank.sqlite')
    cursor = db.cursor()
    cursor.execute(f"SELECT * from main WHERE member_id = {user.id}")
    result = cursor.fetchone()

    sql = f"UPDATE main SET wallet = ? WHERE member_id = ?"
    val = (result[1] + amount, user.id)

    cursor.execute(sql, val)
    db.commit()
    cursor.close()
    db.close()

def remove_bal(user: discord.Member, amount: int):
    db = sqlite3.connect('bank.sqlite')
    cursor = db.cursor()
    cursor.execute(f"SELECT * from main WHERE member_id = {user.id}")
    result = cursor.fetchone()

    sql = f"UPDATE main SET wallet = ? WHERE member_id = ?"
    val = (result[1] - amount, user.id)

    cursor.execute(sql, val)
    db.commit()
    cursor.close()
    db.close() 



@bot.command(name="bal", aliases=['balance'])
@commands.cooldown(1, 10, commands.BucketType.user)
async def balance(ctx, member: discord.Member=None):
        if member == None:
            member = ctx.author
        open_account(member)

        db = sqlite3.connect('bank.sqlite')
        cursor = db.cursor()
        cursor.execute(f"SELECT * FROM main WHERE member_id = {member.id}")
        result = cursor.fetchone()

        embed = discord.Embed(color=get_random_color(), timestamp=ctx.message.created_at)
        embed.set_author(name=f"{member.name}'s Balance", icon_url=member.avatar_url)
        embed.add_field(name="Wallet", value=f"{result[1]} <a:bitcoin_:916983636576829522>")
        embed.add_field(name="Bank", value=f"{result[2]} <a:bitcoin_:916983636576829522>")
        embed.set_footer(text=f"Requested by {ctx.author}", icon_url=member.avatar_url)
        embed.set_thumbnail(url=ctx.guild.icon_url)

        await ctx.send(embed=embed)

@balance.error
async def command_name_error(ctx, error):
  if isinstance(error, commands.CommandOnCooldown):
            em = discord.Embed(title=f"Slow it down bro!",description=f"Try again in {error.retry_after:.2f}s.", color=discord.Color.random())
            await ctx.send(embed=em)


@bot.command(name="beg")
@commands.cooldown(1, 60, commands.BucketType.user)
async def beg(ctx):
        possibility = random.randint(1, 5)
        if possibility == 3:
            return await ctx.send(
                "You begged for coins but recieved a 🩴 instead"
            )

        amount = random.randrange(60, 200)

        outcomes = [
            f"You got **{amount}** <a:bitcoin_:916983636576829522>",
            f"Batman gave you **{amount}** <a:bitcoin_:916983636576829522>",
            f"You begged your mom for **{amount}** <a:bitcoin_:916983636576829522>"
        ]

        add_bal(ctx.author, amount)
        await ctx.send(random.choice(outcomes))

@beg.error
async def command_name_error(ctx, error):
  if isinstance(error, commands.CommandOnCooldown):
            em = discord.Embed(title=f"Slow it down bro!",description=f"Try begging again in {error.retry_after:.2f}s.", color=discord.Color.random())
            await ctx.send(embed=em)

@bot.command(name="dep", aliases=['deposit'])
@commands.cooldown(1, 60, commands.BucketType.user)
async def dep(ctx, amount):
        db = sqlite3.connect('bank.sqlite')
        cursor = db.cursor()
        cursor.execute(f"SELECT * from main WHERE member_id = {ctx.author.id}")
        result = cursor.fetchone()

        if result[1] == 0:
            return await ctx.send(
                "You have 0 coins in your wallet :|"
            )
        done = False
        if amount == "all" or amount == "max":
            sql = "UPDATE main SET bank = ? WHERE member_id = ?"
            val = (result[2] + result[1], ctx.author.id)
            await ctx.send(f"Successfully deposited **{result[1]}** <a:bitcoin_:916983636576829522>")
            remove_bal(ctx.author, result[1])  
            done = True
        if not done:
            try:
                amount = int(amount)
            except ValueError:
                return await ctx.send(
                    "Only `integers | max | all` will be excepted as the amount"
                )

            if result[1] < amount:
                return await ctx.send(
                    f"You cannot deposit more than **{result[1]}** <a:bitcoin_:916983636576829522>"
                )
            
            sql = "UPDATE main SET bank = ? WHERE member_id = ?"
            val = (result[2] + amount, ctx.author.id)
            await ctx.send(
                f"Successfully deposited **{amount}** <a:bitcoin_:916983636576829522>"
            )
            remove_bal(ctx.author, amount)

        cursor.execute(sql, val)
        db.commit()
        cursor.close()
        db.close()
            
@dep.error
async def command_name_error(ctx, error):
  if isinstance(error, commands.CommandOnCooldown):
            em = discord.Embed(title=f"Slow it down bro!",description=f"Try again in {error.retry_after:.2f}s.", color=discord.Color.random())
            await ctx.send(embed=em)

@bot.command(name="with", aliases=['withdraw'])
@commands.cooldown(1, 60, commands.BucketType.user)
async def withdraw(ctx, amount: str):
        open_account(user=ctx.author)
        db = sqlite3.connect('bank.sqlite')
        cursor = db.cursor()
        cursor.execute(f"SELECT * FROM main WHERE member_id = {ctx.author.id}")
        result = cursor.fetchone()
        if result[2] == 0:
            return await ctx.send(
                "You dont have any balance in your bank :|"
            )
        done = False
        if amount == "max" or amount == "all":
            sql = "UPDATE main SET bank = ? WHERE member_id = ?"
            val = (0, ctx.author.id)
            add_bal(ctx.author, result[2])
            await ctx.send(
                f"You successfully withdraw **{result[2]}** <a:bitcoin_:916983636576829522> from your bank!"
            )
            done = True
        
        if not done:
            try:
                amount = int(amount)
            except ValueError:
                return await ctx.send(
                    "Only `integers | max | all` will be accepted"
                )

            if amount >= result[2]:
                sql = "UPDATE main SET bank = ? WHERE member_id = ?"
                val = (0, ctx.author.id)
                add_bal(ctx.author, result[2])
                await ctx.send(
                    f"You successfully withdraw **{result[2]}** <a:bitcoin_:916983636576829522> from your bank!"
                )
            else:
                sql = "UPDATE main SET bank = ? WHERE member_id = ?"
                val = (result[2] - amount, ctx.author.id)
                add_bal(ctx.author, amount)
                await ctx.send(
                    f"You successfully withdraw **{amount}** <a:bitcoin_:916983636576829522> from your bank!"
                )
        
        cursor.execute(sql, val)
        db.commit()
        cursor.close()
        db.close()

@withdraw.error
async def command_name_error(ctx, error):
  if isinstance(error, commands.CommandOnCooldown):
            em = discord.Embed(title=f"Slow it down bro!",description=f"Try again in {error.retry_after:.2f}s.", color=discord.Color.random())
            await ctx.send(embed=em)
 
@bot.command()
@commands.cooldown(1, 60, commands.BucketType.user)
async def gamble(ctx, amount=None):

        try:
            amount = int(amount)
        except ValueError:
            bot.get_command("gamble").reset_cooldown(ctx)
            return await ctx.send(
                "You have to give an integer small brain :/"
            )

        if amount < 100:
            bot.get_command("gamble").reset_cooldown(ctx)
            return await ctx.send(
                "At least gamble 100 coins ._."
            )

        result = check_bal_greater_than(user=ctx.author, amount=amount)
        if result == False:
            bot.get_command("gamble").reset_cooldown(ctx)
            return await ctx.send(
                "Your amount cannot be greater than your balance :|"
            )
        
        if amount == None:
          bot.get_command("gamble").reset_cooldown(ctx)
          return await ctx.send(
                "Please mention amount of coins you want to bet"
            )

        chance = random.randint(1, 4)
        if chance != 3:
            remove_bal(ctx.author, amount)
            return await ctx.send(
                "You lost the bet!"
            )
        multiplier = random.choice([2, 2.25, 2.5, 1.25, 1.5, 1.75])
        total_wallet = int(amount * multiplier)
        add_bal(ctx.author, total_wallet)
        await ctx.send(f"You won {total_wallet} <a:bitcoin_:916983636576829522>")

@gamble.error
async def gamble_error(ctx, error):
  if isinstance(error, commands.CommandOnCooldown):
            em = discord.Embed(title=f"Slow it down bro!",description=f"Try gambling again in {error.retry_after:.2f}s.", color=discord.Color.random())
            await ctx.send(embed=em)

@bot.command(name='work')
@commands.cooldown(1, 60, commands.BucketType.user)
async def work(ctx):
        open_account(user=ctx.author)
        chance = [1, 4]
        if chance == 2:
            return await ctx.send(
                "You worked so hard that you got fired from your office ecks deeeeee",
                "You wored for your brother, but he betrayed you and gave you nothing!"
            )

        amount = random.randrange(400, 600)
        outcomes = [
            f"You worked in your office for **{amount}** <a:bitcoin_:916983636576829522>",
            f"Your boss was frustrated but you worked for him and got **{amount}** <a:bitcoin_:916983636576829522>",
            f"You begged your boss for **{amount}** <a:bitcoin_:916983636576829522>",
            f"You killed your boss and got **{amount}** <a:bitcoin_:916983636576829522> from his wallet",
            f"You got a promotion! You earned **{amount}** <a:bitcoin_:916983636576829522> today :D"
        ]
        
        embed=discord.Embed(color=discord.Color.random())
        embed.add_field(name="Money earned:",value=f"{amount} <a:bitcoin_:916983636576829522>")
        embed.add_field(name="Job:",value=(random.choice(outcomes)),inline=False)
        embed.set_author(name=ctx.author.display_name,icon_url=ctx.author.avatar_url)
        await ctx.send(embed=embed)
        add_bal(ctx.author, amount)




@work.error
async def command_name_error(ctx, error):
  if isinstance(error, commands.CommandOnCooldown):
            em = discord.Embed(title=f"Slow it down bro!",description=f"Try working again in {error.retry_after:.2f}s.", color=discord.Color.random())
            await ctx.send(embed=em)



@bot.command()
@commands.cooldown(1, 86400, commands.BucketType.user)
async def daily(ctx):
  amount = random.randrange(400, 600)
  em=discord.Embed(title=f"{ctx.author.mention} claimed their daily!", description=f"You claimed your daily coins {amount} <a:bitcoin_:916983636576829522>")
  em.set_footer(text=f"Come back after {error.retry_after:.2f}s to claim your next daily")
  em.set_author(name=ctx.author.display_name,icon_url=ctx.author.avatar_url)
  add_bal(ctx.author, amount)
  await ctx.send(embed=em)

@daily.error
async def daily_error(ctx, error):
  if isinstance(error, commands.CommandOnCooldown):
            em = discord.Embed(title=f":/ you already claimed your daily",description=f"Come back in {error.retry_after:.2f}s to claim your daily", color=discord.Color.random())
            await ctx.send(embed=em)





@bot.command()
async def uptime(ctx):
    delta_uptime = datetime.utcnow() - bot.launch_time
    hours, remainder = divmod(int(delta_uptime.total_seconds()), 3600)
    minutes, seconds = divmod(remainder, 60)
    days, hours = divmod(hours, 24)
    await ctx.send(f"{days}d, {hours}h, {minutes}m")


@bot.command()
async def roulette(ctx):
    """Starts a game of Russian roulette."""
    await ctx.send("Welcome to Russian roulette! :gun: Type `shoot` to pull the trigger.")
    await ctx.send("Remember, the number of chambers and the chance of losing will vary each round.")

    num_chambers = random.randint(2, 10)  # Random number of chambers
    chance_of_losing = random.uniform(0.1, 0.5)  # Random chance of losing

    chamber = [0] * (num_chambers - 1) + [1]  # 1 bullet in a random number of chambers
    random.shuffle(chamber)

    def check(message):
        return message.author == ctx.author and message.content.lower() == 'shoot'

    try:
        bullet_index = chamber.index(1)
        for i in range(len(chamber)):
            await ctx.send("**Click!** Type `shoot` to pull the trigger...")
            try:
                await bot.wait_for('message', check=check, timeout=10)  # Wait for player input
            except asyncio.TimeoutError:
                await ctx.send("You took too long to shoot. Game over!")
                return

            if i == bullet_index:
                await ctx.send(":boom: **BANG!** You're dead. :skull_crossbones:")
                return
            else:
                await ctx.send("**Phew!** You survived another round. :sweat_smile:")
    except ValueError:
        await ctx.send("Oops! Something went wrong. Please try again later.")


@bot.command()
async def ranping(ctx):
     # Fetching all members in the server
     members = ctx.guild.members

     # Filtering out bot users and the user who invoked the command
     members = [member for member in members if not member.bot and member != ctx.author]

     # Choosing a random member
     random_member = random.choice(members)

     # Deleting the invoking user's message
     await ctx.message.delete()

     # Pinging the random member
     await ctx.send(f"{random_member.mention} You've been randomly pinged!")


   
@bot.command()
async def avocados(ctx):
  voicetrue = ctx.author.voice
  if voicetrue is None:
        return await ctx.send('Your not connected to a voice channel')
  voice = await ctx.author.voice.channel.connect()
  await ctx.channel.send((f"Avocados from Mexico :avocado:"))
  voice.play(discord.FFmpegPCMAudio('./sounds/Avocados From Mexico.mp3'))
  counter = 0
  duration = 5   # In seconds
  while not counter >= duration:
    await asyncio.sleep(1)
    counter = counter + 1
  await voice.disconnect()

@bot.command()
async def rickroll(ctx):
  voicetrue = ctx.author.voice
  if voicetrue is None:
        return await ctx.send('Your not connected to a voice channel')
  voice = await ctx.author.voice.channel.connect()
  await ctx.channel.send((f"Get Rick Rolled!"))
  voice.play(discord.FFmpegPCMAudio('./sounds/Rick_Astley.mp3'))
  counter = 0
  duration = 18   # In seconds
  while not counter >= duration:
    await asyncio.sleep(1)
    counter = counter + 1
  await voice.disconnect()

@bot.command()
async def water(ctx):
  voicetrue = ctx.author.voice
  if voicetrue is None:
        return await ctx.send('Your not connected to a voice channel')
  voice = await ctx.author.voice.channel.connect()
  await ctx.channel.send((f"Water, water :droplet:!"))
  voice.play(discord.FFmpegPCMAudio('./sounds/water.mp3'))
  counter = 0
  duration = 20   # In seconds
  while not counter >= duration:
    await asyncio.sleep(1)
    counter = counter + 1
  await voice.disconnect()

@bot.command()
async def jungle(ctx):
  voicetrue = ctx.author.voice
  if voicetrue is None:
        return await ctx.send('Your not connected to a voice channel')
  voice = await ctx.author.voice.channel.connect()
  voice.play(discord.FFmpegPCMAudio('./sounds/nature.wav'))
  counter = 0
  duration = 48   # In seconds
  while not counter >= duration:
    await asyncio.sleep(1)
    counter = counter + 1
  await voice.disconnect()     

@bot.command()
async def horn(ctx):
  voicetrue = ctx.author.voice
  if voicetrue is None:
        return await ctx.send('Your not connected to a voice channel')
  voice = await ctx.author.voice.channel.connect()
  await ctx.channel.send((f"Did your ears survived? :loudspeaker:"))
  voice.play(discord.FFmpegPCMAudio('./sounds/air-horn.mp3'))
  counter = 0
  duration = 5   # In seconds
  while not counter >= duration:
    await asyncio.sleep(1)
    counter = counter + 1
  await voice.disconnect()
  
@bot.command()
async def cat(ctx):
  voicetrue = ctx.author.voice
  if voicetrue is None:
        return await ctx.send('Your not connected to a voice channel')
  voice = await ctx.author.voice.channel.connect()
  await ctx.channel.send((f"Meow, Meow :cat:"))
  voice.play(discord.FFmpegPCMAudio('./sounds/Cat.mp3'))
  counter = 0
  duration = 2  # In seconds
  while not counter >= duration:
    await asyncio.sleep(1)
    counter = counter + 1
  await voice.disconnect()
    


@bot.command()
@commands.is_owner()
async def party(ctx):
  voicetrue = ctx.author.voice
  if ctx.message.author.id =='620192561557929989':
    await ctx.send("Hmm You are not my owner :/ wait for him to start the party")
  else:
    await ctx.send("Starting the party now.")
    
  if voicetrue is None:
        return await ctx.send('Your not connected to a voice channel')
  voice = await ctx.author.voice.channel.connect()
  voice.play(discord.FFmpegPCMAudio('./sounds/happybday.mp3'))
  counter = 0
  duration = 7  # In seconds
  while not counter >= duration:
    await asyncio.sleep(1)
    counter = counter + 1
  voice.play(discord.FFmpegPCMAudio('./sounds/happybday1.mp3'))
  counter = 0
  duration = 16  # In seconds
  while not counter >= duration:
    await asyncio.sleep(1)
    counter = counter + 1  
  voice.play(discord.FFmpegPCMAudio('./sounds/happybday2.mp3'))
  counter = 0
  duration = 28  # In seconds
  while not counter >= duration:
    await asyncio.sleep(1)
    counter = counter + 1
  await voice.disconnect() 

@bot.command()
async def tts(ctx, *, content):
  await ctx.message.delete()
  await ctx.send(f"{content}", tts=True)

@tts.error
async def tts_error(ctx, error):
    if isinstance(error, commands.MissingRequiredArgument):
        embed=discord.Embed(title="Missing Required Argument! :warning:", description="Oh, no! looks like you are missing some arguments!",color=discord.Color.red())
        embed.add_field(name="<:red:871672977127768094> Command Usage", value="-> $tts <your message here> Note! mobile users can't hear the tts so be careful, if you're trolling your mobile friend")
        embed.add_field(name="<:red:871672977127768094> Example", value="-> $tts This is a tts message!",inline=False)
        await ctx.send(embed=embed)




 
@bot.command(brief="Gives a random number between 1 and 100")
async def roll(ctx):
        embed = discord.Embed(title=f"Roll a random number!",description=f"{ctx.author.name} Rolled {random.randrange(1, 101)} :game_die:",color=ctx.author.color)
        await ctx.send(embed=embed)


@bot.command(brief="Random number between 1 and 6")
async def dice(ctx):
        embed = discord.Embed(title=f"Roll dice!",description=f"**{ctx.author.name}** Rolled the dice and got **{random.randrange(1, 6)}** :game_die:",color=ctx.author.color)
        await ctx.send(embed=embed)


@bot.command()
async def animeq(ctx):

  URL = f"https://animechan.vercel.app/api/random"
  r = requests.get(url = URL)
  await ctx.send(r.text)




@bot.command()
async def kill(ctx, member: discord.Member= None):

  URL = f"https://GameDeathMessagesAPI.zafirhasanhasan.repl.co"


  if member is not None:
    victim = f"{member.name}"
    user = f"{ctx.author.name}"
  else:
    await ctx.send("ok, you died because of an unexpected error occurred. now try to mention someone")


  # defining a params dict for the parameters to be sent to the API
  PARAMS = {"victim":(member.name), "user":(ctx.author.name)  }
  
  # sending get request and saving the response as response object
  r = requests.get(url = URL, params = PARAMS)
  await ctx.send(r.text)



dares = [
  "spam until you get muted",
  "What was the last thing you searched for on your phone?",
  "Take an embarrassing selfie and post it as your profile picture.",
  "Open your front door and howl like a wolf for 30 seconds.",
  "open discord light mode for 1 min",
  "Call your crush.",
  "Show the most embarrassing photo on your phone",
  "Show the last five people you texted and what the messages said",
  "Attempt to impersonate in the discord server",
]  

@bot.command()
async def d(ctx):
  await ctx.send(random.choice(dares))



async def get_momma_jokes():
    with open(os.path.join("jokes.json")) as joke_file:
        jokes = json.load(joke_file)
    random_category = random.choice(list(jokes.keys()))
    insult = random.choice(list(jokes[random_category]))
    return insult

@bot.command(brief="You Momma is!")
async def yomoma(ctx, member: discord.Member = None):
        insult = await get_momma_jokes()
        if member is not None:
            print("1")
            await ctx.send("%s eat this: %s " % (member.name, insult))
        else:
            print("we are in here")
            await ctx.send("%s for yourself: %s " % (ctx.message.author.name, insult))







@bot.command()
async def tt(ctx):
  await ctx.send(random.choice(["Lesser leather never weathered wetter weather better",
  "Tongue Twisters : She sells seashells by the seashore (challenge say it 5 times rapidly)",
  "Tongue Twisters : How can a clam cram in a clean cream can? (challenge say it 7 times rapidly)",
  "Tongue Twisters : I scream, you scream, we all scream for ice cream (challenge say it 6 times rapidly)",
  "Tongue Twisters : Susie works in a shoeshine shop. Where she shines she sits, and where she sits she shines (challenge say it 4 times rapidly)",
  "Tongue Twisters : fuzzy Wuzzy was a bear. Fuzzy Wuzzy had no hair. Fuzzy Wuzzy wasn’t fuzzy, was he? (challenge say it 5 times rapidly) "
  "Fred fed Ted bread, and Ted fed Fred bread (challenge say it 5 times rapidly)",
  "We surely shall see the sun shine soon (challenge say it 10 times rapidly) ",]))

@bot.command(name='fact')
async def fact(ctx):
  await ctx.send(random.choice(["```Fact: McDonald’s once made bubblegum-flavored broccoli. This interesting fact will have your taste buds crawling. Unsurprisingly, the attempt to get kids to eat healthier didn’t go over well with the child testers, who were “confused by the taste.```”",
  "```Fact: Some fungi create zombies, then control their minds The tropical fungus Ophiocordyceps infects ants’ central nervous systems. By the time the fungi been in the insect bodies for nine days, they have complete control over the host’s movements. They force the ants to climb trees, then convulse and fall into the cool, moist soil below, where fungi thrive. Once there, the fungus waits until exactly solar noon to force the ant to bite a leaf and kill it.```",
  "The tallest living man is 37-year-old Sultan Kosen, from Turkey, who is 8 feet, 2.8 inches, who set the record in 2009. His growth is also due to a pituitary issue. (guinnessworldrecords.com)",
  " It’s impossible to hum while holding your nose (just try it!).",
  "it's impossible to touch your tongue to your nose tip(try it)"]))
 
@bot.command(name='uselessfact')
async def uselessfact(ctx):
  await ctx.send(random.choice(["Useless Fact: Rubber bands last longer when refrigerated.",
  "Useless Fact: No number from one to 999 includes the letter “a” in its word form.",
  "",
  "Flamingos can only eat with their heads upside down.",




  ]))


@bot.command()
async def password(ctx, nbytes: int = 18):
        """ Generates a random password string for you

        This returns a random URL-safe text string, containing nbytes random bytes.
        The text is Base64 encoded, so on average each byte results in approximately 1.3 characters.
        """
        if nbytes not in range(3, 1401):
            return await ctx.send("I only accept any numbers between 3-1400")
        if hasattr(ctx, 'guild') and ctx.guild is not None:
            await ctx.send(f"Sending you a private message with your random generated password **{ctx.author.name}**")
        await ctx.author.send(f"🎁 **Here is your password:**\n{secrets.token_urlsafe(nbytes)}")


@bot.command()
async def f(ctx, *, text: commands.clean_content = None):
        """ Press F to pay respect """
        hearts = ['❤', '💛', '💚', '💙', '💜']
        reason = f"for **{text}** " if text else ""
        await ctx.send(f"**{ctx.author.name}** has paid their respect {reason}{random.choice(hearts)}")

@bot.command()
async def rate(ctx, *, thing: commands.clean_content,user: discord.Member = None):
        """ Rates what you desire """
        rate_amount = random.uniform(0.0, 100.0)
        embed = discord.Embed(title="Rates what you desire!",description=f"I'd rate `{thing}` a **{round(rate_amount, 4)} / 100**")
        await ctx.send(embed=embed)

@rate.error
async def rate_error(ctx, error):
    if isinstance(error, commands.MissingRequiredArgument):
        embed=discord.Embed(title="Missing Required Argument! :warning:", description="Oh, no! looks like you can't rate someone until you mention or their name.",color=discord.Color.red())
        embed.add_field(name="<:red:871672977127768094> Command Usage", value="-> $rate <mention or their name>")
        embed.add_field(name="<:red:871672977127768094> Example", value="-> $rate @Hakashi Katake/Hakashi Katake",inline=False)
        await ctx.send(embed=embed)

@bot.command()
async def loverate(ctx, thing: commands.clean_content, *,  thing2: commands.clean_content, user: discord.Member = None):
        """ Rates what you desire """
        rate_amount = random.uniform(0.0, 100.0)
        embed = discord.Embed(title="Rates your relationship :heart:", description=f"I'd rate `{thing}`'s and `{thing2}'s` relationship a **{round(rate_amount, 4)} / 100** :heart:")
        await ctx.send(embed=embed)

@rate.error
async def rate_error(ctx, error):
    if isinstance(error, commands.CommandInvokeError):
        embed=discord.Embed(title="Missing Required Argument! :warning:", description="Oh, no! looks like you can't rate someone until you mention or their name.",color=discord.Color.red())
        embed.add_field(name="<:red:871672977127768094> Command Usage", value="-> $rate <mention or their name>")
        embed.add_field(name="<:red:871672977127768094> Example", value="-> $rate @Hakashi Katake/Hakashi Katake",inline=False)
        await ctx.send(embed=embed)

@bot.command()
async def gayrate(ctx, *, thing: commands.clean_content,user: discord.Member = None):
        """ Rates what you desire """
        rate_amount = random.uniform(0.0, 100.0)
        embed = discord.Embed(title="Rates your gayness!",description=f"`{thing}` is **{round(rate_amount, 4)} / 100** GAY ")
        await ctx.send(embed=embed)

@rate.error
async def rate_error(ctx, error):
    if isinstance(error, commands.CommandInvokeError):
        embed=discord.Embed(title="Missing Required Argument! :warning:", description="Oh, no! looks like you can't rate someone until you mention or their name.",color=discord.Color.red())
        embed.add_field(name="<:red:871672977127768094> Command Usage", value="-> $rate <mention or their name>")
        embed.add_field(name="<:red:871672977127768094> Example", value="-> $rate @Hakashi Katake/Hakashi Katake",inline=False)
        await ctx.send(embed=embed)

@bot.command()
async def monke(ctx):
  await ctx.send(file=discord.File("./images/monke.png"), spoiler=True)

@bot.command()
async def creeper(ctx):
  await ctx.send(file=discord.File("./images/creeper.png"), spoiler=True)

@bot.command()
async def gamerrate(ctx, *, thing: commands.clean_content, user: discord.Member = None):
        """ Rates what you desire """
        possibility = random.randint(1, 5)
        if possibility == 3:
            return await ctx.send(
                f"`{thing}` is such a boomer! gamerrate you ask? they are 0.00%"
            )
        rate_amount = random.uniform(0.0, 100.0)
        embed = discord.Embed(title="Rates your gamerrate :video_game:",description=f"`{thing}`'s gamerrate is **{round(rate_amount, 4)} / 100**")
        await ctx.send(embed = embed)

@rate.error
async def rate_error(ctx, error):
    if isinstance(error, commands.CommandInvokeError):
        embed=discord.Embed(title="Missing Required Argument! :warning:", description="Oh, no! looks like you can't rate someone until you mention or their name.",color=discord.Color.red())
        embed.add_field(name="<:red:871672977127768094> Command Usage", value="-> $rate <mention or their name>")
        embed.add_field(name="<:red:871672977127768094> Example", value="-> $rate @Hakashi Katake/Hakashi Katake",inline=False)
        await ctx.send(embed=embed)

@bot.command(aliases=['howhot', 'hot'])
async def hotcalc(ctx, *, user: discord.Member = None):
        """ Returns a random percent for how hot is a discord user """
        user = user or ctx.author

        random.seed(user.id)
        r = random.randint(1, 100)
        hot = r / 1.17

        emoji = "💔"
        if hot > 25:
            emoji = "❤"
        if hot > 50:
            emoji = "💖"
        if hot > 75:
            emoji = "💞"

        await ctx.send(f"**{user.name}** is **{hot:.2f}%** hot {emoji}")

@hotcalc.error
async def hotcalc_error(ctx, error):
    if isinstance(error, commands.CommandInvokeError):
        embed=discord.Embed(title="Missing Required Argument! :warning:", description="Oh, no! looks like you can't find someone's hotness until you mention.",color=discord.Color.red())
        embed.add_field(name="<:red:871672977127768094> Command Usage", value="-> $ <mention>")
        embed.add_field(name="<:red:871672977127768094> Example", value="-> $rate @Hakashi Katake/Hakashi Katake",inline=False)
        await ctx.send(embed=embed)

@bot.command(aliases=['slots'])
@commands.cooldown(rate=1, per=3.0, type=commands.BucketType.user)
async def slot(ctx):
        """ Roll the slot machine """
        emojis = "🍎🍊🍐🍋🍉🍇🍓🍒"
        a = random.choice(emojis)
        b = random.choice(emojis)
        c = random.choice(emojis)

        slotmachine = f"**[ {a} {b} {c} ]\n{ctx.author.name}**,"

        if (a == b == c):
            await ctx.send(f"{slotmachine} All matching, you won! 🎉")
        elif (a == b) or (a == c) or (b == c):
            await ctx.send(f"{slotmachine} 2 in a row, you won! 🎉")
        else:
            await ctx.send(f"{slotmachine} No match, you lost 😢")



    



           

@bot.command()
@commands.has_permissions(administrator = True)
async def setdelay(ctx, seconds: int):
    await ctx.message.delete()
    await ctx.channel.edit(slowmode_delay=seconds)
    await ctx.send(f"Set the slowmode delay in this channel to {seconds} seconds!")

@setdelay.error
async def setdelay_error(ctx, error):
    print(error)
    if isinstance(error, commands.MissingPermissions):
        await ctx.send("Please check if you have all the required perms. perms needed to execute this cmd ``administrator``")        

        

@bot.command(aliases=['flip', 'coin'])
async def coinflip(ctx):
        """ Coinflip! """
        coinsides = ['Heads', 'Tails']
        await ctx.send(f"**{ctx.author.name}** flipped a coin and got **{random.choice(coinsides)}**! :coin:")

@bot.command()
async def reversed(ctx, *, text: str):
        """ !poow ,ffuts esreveR
        Everything you type after reverse will of course, be reversed
        """
        t_rev = text[::-1].replace("@", "@\u200B").replace("&", "&\u200B")
        await ctx.send(f"🔁 {t_rev}")
         
@reversed.error
async def reversed_error(ctx, error):
    if isinstance(error, commands.MissingRequiredArgument):
        embed=discord.Embed(title="Missing Required Argument! :warning:", description="Oh, no! looks like you are missing some arguments!",color=discord.Color.red())
        embed.add_field(name="<:red:871672977127768094> Command Usage", value="-> $reversed <word you want to reverse>")
        embed.add_field(name="<:red:871672977127768094> Example", value="-> $reversed Hi bro",inline=False)
        await ctx.send(embed=embed)

@bot.command(name="banner")
async def banner(ctx):
        """ Get the current banner image """
        if not ctx.guild.banner:
            return await ctx.send("This server does not have a banner...")
        
        embed=discord.Embed(title=f"Banner of **{ctx.guild.name}",color=discord.Color.random())
        embed.set_image(url=f"{ctx.guild.banner_url_as(format='png')}")
        await ctx.send(embed=embed)

@bot.command()
@commands.guild_only()
async def user(ctx, *, user: discord.Member = None):
        """ Get user information """
        user = user or ctx.author

        show_roles = ', '.join(
            [f"<@&{x.id}>" for x in sorted(user.roles, key=lambda x: x.position, reverse=True) if x.id != ctx.guild.default_role.id]
        ) if len(user.roles) > 1 else 'None'

        embed = discord.Embed(colour=user.top_role.colour.value)
        embed.set_thumbnail(url=user.avatar_url)

        embed.add_field(name="Full name", value=user, inline=True)
        embed.add_field(name="Nickname", value=user.nick if hasattr(user, "nick") else "None", inline=True)
        embed.add_field(name="Roles", value=show_roles,inline=False)
        embed.add_field(name="ID", value=user.id,inline=True)

        await ctx.send(content=f"ℹ About **{user.id}**", embed=embed)
    




@bot.command()
async def gif(ctx,*,q="random"):

    api_key="cHZuHydGVlcYGyQiXvnqywmim3x5qwUN"
    api_instance = giphy_client.DefaultApi()

    try: 
    # Search Endpoint
    
        api_response = api_instance.gifs_search_get(api_key, q, limit=5, rating='g')
        lst = list(api_response.data)
        giff = random.choice(lst)

        emb = discord.Embed(title=q)
        emb.set_image(url = f'https://media.giphy.com/media/{giff.id}/giphy.gif')

        await ctx.channel.send(embed=emb)
    except ApiException as e:
        print("Exception when calling DefaultApi->gifs_search_get: %s\n" % e)




@commands.has_permissions(manage_messages=True)
@bot.command(pass_context=True)
async def poll(ctx, question, *options: str):

    if len(options) > 2:
        await ctx.send('```Error! Syntax = [~poll "question" "option1" "option2"] ```')
        return

    if len(options) == 2 and options[0] == "yes" and options[1] == "no":
        reactions = ['👍', '👎']
    else:
        reactions = ['👍', '👎']

    description = []
    for x, option in enumerate(options):
        description += '\n {} {}'.format(reactions[x], option)

    poll_embed = discord.Embed(title=question, color=0x31FF00, description=''.join(description))

    react_message = await ctx.send(embed=poll_embed)

    for reaction in reactions[:len(options)]:
        await react_message.add_reaction(reaction)

@poll.error
async def poll_error(ctx, error):
    print(error)
    if isinstance(error, commands.MissingPermissions):
        await ctx.send("Please check if you have all the required perms. perms needed to execute this cmd `manage_messages`") 

@bot.command()
async def timer(ctx, timeInput):
    try:
        try:
            time = int(timeInput)
        except:
            convertTimeList = {'s':1, 'm':60, 'h':3600, 'd':86400, 'S':1, 'M':60, 'H':3600, 'D':86400}
            time = int(timeInput[:-1]) * convertTimeList[timeInput[-1]]
        if time > 86400:
            await ctx.send("I can\'t do timers over a day long")
            return
        if time <= 0:
            await ctx.send("Timers don\'t go into negatives :/")
            return
        if time >= 3600:
            message = await ctx.send(f"Timer: {time//3600} hours {time%3600//60} minutes {time%60} seconds")
        elif time >= 60:
            message = await ctx.send(f"Timer: {time//60} minutes {time%60} seconds")
        elif time < 60:
            message = await ctx.send(f"Timer: {time} seconds")
        while True:
            try:
                await asyncio.sleep(5)
                time -= 1
                if time >= 3600:
                    await message.edit(content=f"Timer: {time//3600} hours {time %3600//60} minutes {time%60} seconds")
                elif time >= 60:
                    await message.edit(content=f"Timer: {time//60} minutes {time%60} seconds")
                elif time < 60:
                    await message.edit(content=f"Timer: {time} seconds")
                if time <= 0:
                    await message.edit(content="Ended!")
                    await ctx.send(f"{ctx.author.mention} Your countdown Has ended!")
                    break
            except:
                break
    except:
        await ctx.send(f"Alright, first you gotta let me know how I\'m gonna time **{timeInput}**....")

@timer.error
async def timer_error(ctx, error):
    if isinstance(error, commands.MissingRequiredArgument):
        embed=discord.Embed(title="Missing Required Argument! :warning:", description="Oh, no! looks like you are missing some arguments!",color=discord.Color.red())
        embed.add_field(name="<:red:871672977127768094> Command Usage", value="-> $timer <your timer>")
        embed.add_field(name="<:red:871672977127768094> Example",value="-> $timer 1m",inline=False)
        await ctx.send(embed=embed)

@bot.command()
async def info(ctx):
  embed = discord.Embed(title = "Bot info", description = "",color=discord.Color.blue())
  embed.add_field(name = "Bot Owner", value = "Hakashi Katake#001", inline=False)
  embed.add_field(name = "Total Users", value = f"{len(bot.users)}", inline=False)
  embed.add_field(name = "Total Servers", value = f"{len(bot.guilds)}",inline=False)
  embed.add_field(name = "Bot Hosted on", value = "Repl.it",inline=False)
  embed.add_field(name = "Bot Prefix", value = "$",inline=False)
  await ctx.send(embed=embed)

@bot.command(name='sus', help='Eject a player. 1min cd', usage='@!Random')
@commands.guild_only()
async def sus(ctx, member: discord.Member):
        
        is_sus = random.choice([True, False])
        if is_sus:
            await ctx.send(f'.      　。　　　　•　    　ﾟ　　。\n　.　　　.　　　  　　.　　　　　。　　   。　.\n　　 .     。　        ඞ   。　    .    •\n•      。 {member.name}  was An Impostor  .   。   ﾟ   .　\n  。  .   ﾟ   　1 Imposter Remains　　　ﾟ　　　.　　　\n,　　　　.　 .　　       .          .     。\n　.　　　.　　　  　　.　　　　　。　　   。　.')
        else:
            await ctx.send(f'.      　。　　　　•　    　ﾟ　　。\n　.　　　.　　　  　　.　　　　　。　　   。　.\n　　 .     。　        ඞ   。　    .    •\n•      。 {member.name}  was not An Impostor  .   。   ﾟ   .　\n  。  .   ﾟ   　2 Imposters Remain　　　ﾟ　　　.　　　\n,　　　　.　 .　　       .          .     。\n　.　　　.　　　  　　.　　　　　。　　   。　.')

@bot.command(name='randomsus', help='Randomly eject player. 1min cd')
@commands.guild_only()
async def randomsus(ctx):

        is_sus = random.choice([True, False])
        if is_sus:
            await ctx.send(
                f'.      　。　　　　•　    　ﾟ　　。\n　.　　　.　　　  　　.　　　　　。　　   。　.\n　　 .     。　        ඞ   。　    .    •\n•      。 {random.choice(ctx.message.channel.guild.members).name}  was An Impostor  .   。   ﾟ   .　\n  。  .   ﾟ   　1 Imposter Remains　　　ﾟ　　　.　　　\n,　　　　.　 .　　       .          .     。\n　.　　　.　　　  　　.　　　　　。　　   。　.')
        else:
            await ctx.send(f'.      　。　　　　•　    　ﾟ　　。\n　.　　　.　　　  　　.　　　　　。　　   。　.\n　　 .     。　        ඞ   。　    .    •\n•      。 {random.choice(ctx.message.channel.guild.members).name}  was not An Impostor  .   。   ﾟ   .　\n  。  .   ﾟ   　2 Imposters Remain　　　ﾟ　　　.　　　\n,　　　　.　 .　　       .          .     。\n　.　　　.　　　  　　.　　　　　。　　   。　.')


@sus.error
async def sus_error(ctx, error):
        if isinstance(error, commands.MissingRequiredArgument):
            em = discord.Embed(title=":warning: Missing Required Argument",description="Bruh you can't eject your self stupid try mentioning soneone", color = discord.Color.red())
            await ctx.send(embed=em)

@bot.command(name='time', help='Get current date and time from around the globe.')
async def time(ctx):

        tz = {
            'Etc/GMT': '',
            'Europe/London': '',
            'WET': '',
            'CET': '',
            'EET': '',
            'Etc/GMT+3': '',
            'US/Alaska': '',
            'US/Eastern': '',
            'US/Central': '',
            'US/Mountain': '',
            'US/Pacific': '',
            'US/Hawaii': '',
            'Canada/Atlantic': '',
            
        }

        for i in tz:
            zone = pytz.timezone(i)
            time = datetime.now(zone)
            tz[i] = time.strftime('%Y/%m/%d :: %I:%M %p')

        embed = discord.Embed(title='Current Time around the world', colour=(0x11806a))
        embed.add_field(name='GMT' , value=tz['Etc/GMT'])
        embed.add_field(name='BST' , value=tz['Europe/London'])
        embed.add_field(name='WEST' , value=tz['WET'])
        embed.add_field(name='CEST' , value=tz['CET'])
        embed.add_field(name='EEST' , value=tz['EET'])
        embed.add_field(name='MSK' , value=tz['Etc/GMT+3'])
        embed.add_field(name='AST' , value=tz['US/Alaska'])
        embed.add_field(name='EST' , value=tz['US/Eastern'])
        embed.add_field(name='CST' , value=tz['US/Central'])
        embed.add_field(name='MST' , value=tz['US/Mountain'])
        embed.add_field(name='PST' , value=tz['US/Pacific'])
        embed.add_field(name='HST' , value=tz['US/Hawaii'])
        embed.add_field(name='AKST' , value=tz['Canada/Atlantic'])
        

        await ctx.send(f'{ctx.author.mention}', embed=embed)

@bot.command()
async def thank(ctx, member : discord.Member, *, reason):

  embed = discord.Embed(title="",description=f"You thanked {member.mention}  {reason}", color=discord.Color.blue())
  await ctx.send(embed = embed)

  
@thank.error
async def thank_error(ctx, error):
    if isinstance(error, commands.MissingRequiredArgument):
      em = discord.Embed(title=":warning: Missing Required Arguemnt",description=f"Please check if you have entered all the required arguements. \n \n **Usage:** \n \n $thank @hakashi Katake <reason here>", color = discord.Color.red())
      await ctx.send(embed=em)

@bot.command()
async def owner(ctx):
  guild_owner = bot.get_user(int(ctx.guild.owner.id))
  embed = discord.Embed(title="The king of the server <a:TS_Crown:916983638699155497>",description=f"The King of this server is **{guild_owner}**",color=discord.Color.orange())
  await ctx.send(embed=embed)

@bot.command()
async def members(ctx):
  embed = discord.Embed(title="The total count of members",description=f"Total members in **{ctx.guild.name}** are **{len(ctx.guild.members)} <:members:871393983950118962>**",color=ctx.author.color,timestamp=ctx.message.created_at)

  await ctx.send(embed=embed)

 

@bot.command()
async def dmspam(ctx, member: discord.Member, amount:int, *, message=None):
  message = message or "well this is a spam :/"
  if amount < 51:
    for _ in range(amount):
      await member.send(message)
  else:
        await ctx.send('the limit to the amount of messages you can spam is `50`')
        
@bot.command()
async def wish(ctx, member: discord.Member, amount:int):
  msg = "Many, many Happy returns of the day. :partying_face: :heart: hope you enjoyed your whole year :). Imma send more surprises sooon."
  if amount < 11:
        for _ in range(amount):
          message = await member.send(f"Hey, {member.name}. {ctx.author.name} is trying to wish you. would you like to accept their wish?")
          await message.add_reaction("✅")
          await message.add_reaction("❎")
          try:
            reaction, user = await bot.wait_for("reaction_add", check=lambda reaction, user: user == member and reaction.emoji in ["✅", "❎"], timeout=30.0)
            
          except asyncio.TimeoutError:
            await member.send(":/ you were late to confirm the wish.")
          else:
            if reaction.emoji == "✅":
              await member.send(msg)
            else:
              await member.send(f"You declined the wish request {member.name}")
          
@bot.command()
async def lmgtfy(ctx, *quer: str):
        curr_url = "https://www.google.com/search?q="
        query = " ".join(quer)
        query = query.replace(" ", "+")
        curr_url += query
        embed = discord.Embed(title="Let Me Google That For You!",description=curr_url)
        embed.set_footer(text="Command that creats a Let Me Google That For You (lmgtfy) link for all your queries! Perfect for lazy people.")
        await ctx.reply(embed=embed)       
          




@bot.command(aliases=['mimic', 'copy'])
async def spam(ctx, amount:int, *, message):
    if amount < 6:
        for _ in range(amount):
            await ctx.send(message)
    
    else:
        await ctx.reply('the limit to the amount of messages you can spam is `5`')




@bot.command()
@commands.is_owner()
async def eval(ctx, *, body):
  
    env = {
        'ctx': ctx,
        'bot': bot,
        'channel': ctx.channel,
        'author': ctx.author,
        'guild': ctx.guild,
        'message': ctx.message,
        'source': inspect.getsource
    }

    def cleanup_code(content):
        """Automatically removes code blocks from the code."""
        # remove ```py\n```
        if content.startswith('```') and content.endswith('```'):
            return '\n'.join(content.split('\n')[1:-1])

        # remove `foo`
        return content.strip('` \n')

    def get_syntax_error(e):
        if e.text is None:
            return f'```py\n{e.__class__.__name__}: {e}\n```'
        return f'```py\n{e.text}{"^":>{e.offset}}\n{e.__class__.__name__}: {e}```'

    env.update(globals())

    body = cleanup_code(body)
    stdout = io.StringIO()
    err = out = None

    to_compile = f'async def func():\n{textwrap.indent(body, "  ")}'

    def paginate(text: str):
        '''Simple generator that paginates text.'''
        last = 0
        pages = []
        for curr in range(0, len(text)):
            if curr % 1980 == 0:
                pages.append(text[last:curr])
                last = curr
                appd_index = curr
        if appd_index != len(text)-1:
            pages.append(text[last:curr])
        return list(filter(lambda a: a != '', pages))
    
    try:
        exec(to_compile, env)
    except Exception as e:
        err = await ctx.send(f'```py\n{e.__class__.__name__}: {e}\n```')
        return await ctx.message.add_reaction('\u2049')

    func = env['func']
    try:
        with redirect_stdout(stdout):
            ret = await func()
    except Exception as e:
        value = stdout.getvalue()
        err = await ctx.send(f'```py\n{value}{traceback.format_exc()}\n```')
    else:
        value = stdout.getvalue()
        if ret is None:
            if value:
                try:
                    
                    out = await ctx.send(f'```py\n{value}\n```')
                except:
                    paginated_text = paginate(value)
                    for page in paginated_text:
                        if page == paginated_text[-1]:
                            out = await ctx.send(f'```py\n{page}\n```')
                            break
                        await ctx.send(f'```py\n{page}\n```')
        else:
            try:
                out = await ctx.send(f'```py\n{value}{ret}\n```')
            except:
                paginated_text = paginate(f"{value}{ret}")
                for page in paginated_text:
                    if page == paginated_text[-1]:
                        out = await ctx.send(f'```py\n{page}\n```')
                        break
                    await ctx.send(f'```py\n{page}\n```')

    if out:
        await ctx.message.add_reaction('\u2705')  # tick
    elif err:
        await ctx.message.add_reaction('\u2049')  # x
    else:
        await ctx.message.add_reaction('\u2705')
       
  
  






@bot.command(aliases=['TEXT'])
async def photo(ctx, *, text = "No text entered"):

  img = Image.open("./images/white bg.png")
  draw = ImageDraw.Draw(img)
  font = ImageFont.truetype("./fonts/arial.ttf", 15)

  draw.text((31,92), text, (0, 0, 0), font=font)

  img.save("white.png")

  await ctx.send(file = discord.File("white.png"))

@bot.command()
async def cancel(ctx, *, text = "Your mum"):


  img = Image.open("./images/cancel.png")
  font = ImageFont.truetype("./fonts/arial.ttf", 15)
  draw = ImageDraw.Draw(img)


  draw = ImageDraw.Draw(img)

  draw.text((160,41), text, (0, 0, 0), font=font)


  img.save("hi.png")

  await ctx.send(file = discord.File("hi.png"))


@bot.command()
async def billy(ctx, *, text = "i didnt invited captain hook"):


  img = Image.open("./images/billy.png")
  font = ImageFont.truetype("./fonts/arial.ttf", 9)
  draw = ImageDraw.Draw(img)

  draw.text((15,126), text, (0, 0, 0), font=font)
  text = "aim at head"
  draw.text((123,134), text, (0, 0, 0) ,font=font)


  img.save("hiii.png")

  await ctx.send(file = discord.File("hiii.png"))

@bot.command(pass_context=True)
async def minfo(ctx, user: discord.Member=None):
    img = Image.open("./images/infoimgimg.png") #Replace infoimgimg.png with your background image.
    asset = user.avatar_url_as(size=4096)
    data = BytesIO(await asset.read())
    pfp = Image.open(data)
    img.paste(pfp,(2053,152))
    draw = ImageDraw.Draw(img)
    font = ImageFont.truetype("./fonts/Modern_Sans_Light.otf", 100) #Make sure you insert a valid font from your folder.
    fontbig = ImageFont.truetype("./fonts/Fitamint Script.ttf", 400) #Make sure you insert a valid font from your folder.
    #    (x,y)::↓ ↓ ↓ (text)::↓ ↓     (r,g,b)::↓ ↓ ↓
    draw.text((200, 0), "Information:", (255, 255, 255), font=fontbig) #draws Information
    draw.text((50, 500), "Username: {}".format(user.name), (255, 255, 255), font=font) #draws the Username of the user
    draw.text((50, 700), "ID:  {}".format(user.id), (255, 255, 255), font=font) #draws the user ID
    draw.text((50, 900), "User Status: {}".format(user.status), (255, 255, 255), font=font) #draws the user status
    draw.text((50, 1100), "Account created: {}".format(user.created_at,"%A, %B, %-d,%Y"), (255, 255, 255), font=font) #When the account was created 
    draw.text((50, 1300), "Nickname: {}".format(user.display_name), (255, 255, 255), font=font) # Nickname of the user
    draw.text((50, 1500), "Users' Top Role: {}".format(user.top_role), (255, 255, 255), font=font) #draws the top rome
    draw.text((50, 1700), "User Joined: {}".format(user.joined_at), (255, 255, 255), font=font) #draws info about when the user joined
    img.save('infoimg2.png') #Change infoimg2.png if needed.
    await ctx.send(file = discord.File("infoimg2.png"))
    

@bot.command(aliases=['Wanted'])
async def w(ctx,*, user: discord.Member = None):
  async with ctx.typing():
    if user == None:
        user = ctx.author

    wanted = Image.open("./images/wanted.png")
    
    asset = user.avatar_url_as(size=128)

    data = BytesIO(await asset.read())
    pfp = Image.open(data)
   

    pfp = pfp.resize((706,661))
  
    wanted.paste(pfp,(256,745))

    wanted.save("profile.png")

    await ctx.send(file=discord.File("profile.png"))
  

@bot.command()
async def spongebob(ctx,*, user: discord.Member = None):
  async with ctx.typing():
    if user == None:
        user = ctx.author

    wanted = Image.open("./images/meeme.png")
    
    asset = user.avatar_url_as(size=128)

    data = BytesIO(await asset.read())
    pfp = Image.open(data)
   

    pfp = pfp.resize((351,319))
  
    wanted.paste(pfp,(94,424))

    wanted.save("meh.png")

    await ctx.send(file=discord.File("meh.png"))

@bot.command()
async def god(ctx,*, user: discord.Member = None):
  async with ctx.typing():
    if user == None:
        user = ctx.author

    wanted = Image.open("./images/god.png")
    
    asset = user.avatar_url_as(size=128)

    data = BytesIO(await asset.read())
    pfp = Image.open(data)
   

    pfp = pfp.resize((150,111))
  
    wanted.paste(pfp,(153,149))

    wanted.save("3.png")

    await ctx.send(file=discord.File("3.png"))

@bot.command()
async def nooneisperfect(ctx,*, user: discord.Member = None):
  async with ctx.typing():
    if user == None:
        user = ctx.author

    wanted = Image.open("./images/noone.png")
    
    asset = user.avatar_url_as(size=128)

    data = BytesIO(await asset.read())
    pfp = Image.open(data)
   

    pfp = pfp.resize((237,222))
  
    wanted.paste(pfp,(275,153))

    wanted.save("3.png")

    await ctx.send(file=discord.File("3.png"))

@bot.command()
async def stonks(ctx,*, user: discord.Member = None):
  async with ctx.typing():
    if user == None:
        user = ctx.author

    wanted = Image.open("./images/stonks.jpg")
    
    asset = user.avatar_url_as(size=128)

    data = BytesIO(await asset.read())
    pfp = Image.open(data)
   

    pfp = pfp.resize((100,112))
  
    wanted.paste(pfp,(83,40))

    wanted.save("lmao.png")

    await ctx.send(file=discord.File("lmao.png"))

@bot.command()
async def blur(ctx,*, user: discord.Member = None):
  async with ctx.typing():
    if user == None:
        user = ctx.author

    wanted = Image.open("./images/blur.jpg")
    asset = user.avatar_url_as(size=128)
    data = BytesIO(await asset.read())
    pfp = Image.open(data)
    pfp = pfp.resize((393,349))
    wanted.paste(pfp,(358,3))
    wanted.filter(ImageFilter.GaussianBlur(15)).save("lmao0.png")
    await ctx.send(file=discord.File("lmao0.png"))



@bot.command()
async def ben(ctx,*, user: discord.Member = None):
  async with ctx.typing():
    if user == None:
        user = ctx.author

    wanted = Image.open("./images/ben.png")
    
    asset = user.avatar_url_as(size=128)

    data = BytesIO(await asset.read())
    pfp = Image.open(data)
   

    pfp = pfp.resize((116,90))
  

    wanted.paste(pfp,(175,72))

    wanted.save("./saves/benny.png")

    await ctx.send(file=discord.File("./saves/benny.png"))


@bot.command()
async def rip(ctx,*, user: discord.Member = None):
  async with ctx.typing():
    if user == None:
        user = ctx.author

    wanted = Image.open("./images/rip.png")
    
    asset = user.avatar_url_as(size=128)

    data = BytesIO(await asset.read())
    pfp = Image.open(data)
   

    pfp = pfp.resize((219,234))
  

    wanted.paste(pfp,(151,160))

    wanted.save("./saves/ded.png")

    await ctx.send(file=discord.File("./saves/ded.png"))

@bot.command()
async def error(ctx, member: discord.Member = None):

    if member == None:
      member = ctx.author

    img = Image.open("./images/exe.png")
    font = ImageFont.truetype("./fonts/arial.ttf", 15)

    draw = ImageDraw.Draw(img)

    text = f"{member}.exe has stopped working"

    draw.text((65,49), text, (0, 0, 0), font=font)

    text = f"{member}.exe"

    draw.text((33,13), text, (0, 0, 0), font=font)

    img.save("text.png")
    await ctx.send(file = discord.File("text.png"))


@bot.command()
async def createemoji(ctx, url: str, *, name):
	guild = ctx.guild
	if ctx.author.guild_permissions.manage_emojis:
		async with aiohttp.ClientSession() as ses:
			async with ses.get(url) as r:
				
				try:
					img_or_gif = BytesIO(await r.read())
					b_value = img_or_gif.getvalue()
					if r.status in range(200, 299):
						emoji = await guild.create_custom_emoji(image=b_value, name=name)
						await ctx.send(f'Successfully created emoji: <:{name}:{emoji.id}>')
						await ses.close()
					else:
						await ctx.send(f'Error when making request | {r.status} response.')
						await ses.close()
						
				except discord.HTTPException:
					await ctx.send('File size is too big!')

@bot.command()
async def deleteemoji(ctx, emoji: discord.Emoji):
	guild = ctx.guild
	if ctx.author.guild_permissions.manage_emojis:
		await ctx.send(f'Successfully deleted (or not): {emoji}')
		await emoji.delete()

@bot.command()
async def bug(ctx, desc=None, rep=None):
    await ctx.channel.send(f"Check your dms")
    user = ctx.author
    await ctx.author.send('```Please explain the bug```')
    responseDesc = await bot.wait_for('message', check=lambda message: message.author == ctx.author, timeout=300)
    description = responseDesc.content
    await ctx.author.send('````Please provide pictures/videos of this bug```')
    if len(ctx.message.attachments):
      embed.set_image(
        url=ctx.message.attachments[0].url
    )
    responseRep = await bot.wait_for('message', check=lambda message: message.author == ctx.author, timeout=300)
    await ctx.author.send('```bug reported was sended to the support server```')
    replicate = responseRep.content
    embed = discord.Embed(title='Bug Report', color=0x00ff00)
    embed.add_field(name='Description', value=description, inline=False)
    embed.add_field(name='Replicate', value=replicate, inline=True)
    embed.add_field(name='Reported By', value=user, inline=True)
    adminBug = bot.get_channel(916966058013892660)
    await adminBug.send(embed=embed)

    # Add 3 reaction (different emojis) here

@bot.command()
async def b(ctx, *, bugReport=None):
    """Command that allows users to report bugs about the bug"""

    channel = bot.get_channel(916966058013892660)

    bugEmbed = discord.Embed(
        title=f"Bug Report",
        description=bugReport,
        color= 0xFFFF00
    )

    bugEmbed.add_field(
        name="Reported by",
        value=f"<@{ctx.author.id}>"
    )

    bugEmbed.set_footer(
        text="",
        icon_url=ctx.author.avatar_url
    )
    if len(ctx.message.attachments):
      bugEmbed.set_image(
        url=ctx.message.attachments[0].url
    )

    if bugReport is None:
        await ctx.send("You didn't include a bug with the report! Try again.")
    return

    await channel.send(embed=bugEmbed)


@bot.command()
async def suggestcmd(ctx, desc=None, rep=None):
    await ctx.channel.send(f"Please Check your dms")
    user = ctx.author
    await ctx.author.send('**Explain your command suggestion.**')
    responseDesc = await bot.wait_for('message', check=lambda message: message.author == ctx.author, timeout=300)
    description = responseDesc.content
    await ctx.author.send('**Tell us your server name, where you invited the bot!**')
    responseRep = await bot.wait_for('message', check=lambda message: message.author == ctx.author, timeout=300)
    await ctx.author.send("**Thanks! the command suggestion has been sent to our support server for more queries join our ** [support server](https://discord.gg/GQpAfdkEFs)")
    replicate = responseRep.content
    embed = discord.Embed(title='Command suggestions', color=discord.Color.blue())
    embed.add_field(name='Command suggested:', value=description, inline=False)
    embed.add_field(name='Server name:', value=replicate, inline=True)
    embed.add_field(name='By:', value=user, inline=False)
    adminBug = bot.get_channel(877060032481603595)
    await ctx.adminBug.send(embed=embed)




member = discord.Member
emails = ["badboy@gmail.com:badboi12345",
"shittygamer@gmail.com:poop1234",
"idk@gmail.com:idkthepassword",
f"bruhgamer@gmail.com:eeeeeeeeeeee123qwe"]

ips = ["134.57.567.45",
"145.57.25.90",
"344.54.78.133"]

@bot.command()
async def hack(ctx, member : discord.Member):
  message = await ctx.send(f"Hacking `{member.name}`...")
  await asyncio.sleep(3)
  await message.edit(content=f"Accessing personal information")
  await asyncio.sleep(3)
  await message.edit(content=f"Gathering ip address")
  await asyncio.sleep(3)
  await message.edit(content=f"Found ip adress: ||{random.choice(ips)}||")
  await asyncio.sleep(3)
  await message.edit(content=f"Invading system files")
  await asyncio.sleep(3)
  await message.edit(content=f"encrypting files...")
  await asyncio.sleep(3)
  await message.edit(content=f"Accessing their Epic Games account")
  await asyncio.sleep(3)
  await message.edit(content=f"Deleting their all games from library")
  await asyncio.sleep(3)
  await message.edit(content=f"Aceessing their Steam account")
  await asyncio.sleep(3)
  await message.edit(content=f"Deleting their all games from library and robbing their steam credits")
  await asyncio.sleep(3)
  await message.edit(content=f"Installing virus || rickroll.exe||")
  await asyncio.sleep(3)
  await message.edit(content=f"Accessing their discord account's email and password")
  await asyncio.sleep(3)
  await message.edit(content=f"Email and Password Found!: ||{random.choice(emails)}||")
  await asyncio.sleep(3)
  await message.edit(content=f"Deleting their discord account..")
  await asyncio.sleep(3)
  await message.edit(content=f"Exporting data to the mainframe")
  await asyncio.sleep(3)
  await message.edit(content=f"Exporting data completed 50%...")
  await asyncio.sleep(3)
  await message.edit(content=f"Exporting data completed 100%..")
  await asyncio.sleep(3)
  await message.edit(content=f"Hack completed! {member.name} has been successfully hacked.")
  embed = discord.Embed(title="you have been infected by rickroll virus!",description="")
  embed.set_image(url='https://media.giphy.com/media/Vuw9m5wXviFIQ/giphy.gif')
  embed.set_footer(icon_url='https://media.giphy.com/media/Vuw9m5wXviFIQ/giphy.gif', text="Rick_Astley")
  await member.send(embed=embed)




@bot.command()
async def send_meme(ctx):
    subreddit = "memes"  # Change this to the subreddit you want to fetch memes from
    url = f"https://www.reddit.com/r/{subreddit}/random.json"

    async with aiohttp.ClientSession() as session:
        async with session.get(url, headers={'User-Agent': 'Mozilla/5.0'}) as resp:
            data = await resp.json()

            if 'error' in data:
                await ctx.send('Error fetching meme from Reddit. Please try again later.')
                return

            meme_data = data[0]['data']['children'][0]['data']
            meme_title = meme_data['title']
            meme_url = meme_data['url']

            async with session.get(meme_url) as meme_resp:
                if meme_resp.status == 200:
                    meme_bytes = await meme_resp.read()

                    # Randomly decide whether to send a meme or an edited picture
                    send_edited_pic = random.random() < 0.1  # 10% chance to send an edited picture
                    if send_edited_pic:
                        # Replace this with your list of edited picture URLs
                        edited_pic_urls = [
                            'https://cdn.discordapp.com/attachments/1227569810892652654/1233439659921768490/image.png?ex=662dc273&is=662c70f3&hm=929a6f5e6d06d81586f9790ebe41ad4435807b22c0e17bd0ffe84eb6e06de4e6&'

                            # Add more edited picture URLs as needed
                        ]
                        edited_pic_url = random.choice(edited_pic_urls)
                        async with session.get(edited_pic_url) as edited_pic_resp:
                            if edited_pic_resp.status == 200:
                                edited_pic_bytes = await edited_pic_resp.read()
                                file = discord.File(io.BytesIO(edited_pic_bytes), filename=f"edited_{meme_title}.jpg")
                            else:
                                await ctx.send('Error fetching edited picture. Sending meme instead.')
                                file = discord.File(io.BytesIO(meme_bytes), filename=f"{meme_title}.jpg")
                    else:
                        file = discord.File(io.BytesIO(meme_bytes), filename=f"{meme_title}.jpg")

                    # Send the meme or edited picture as a file in DM to the command invoker
                    try:
                        await ctx.author.send(file=file)
                        await ctx.send('Sent meme in DM!')
                    except discord.Forbidden:
                        await ctx.send('Could not send meme. Make sure you have DMs enabled.')
                else:
                    await ctx.send('Error fetching meme from Reddit. Please try again later.')








@bot.command()
async def t(ctx):
  msg = await ctx.channel.send(("Catch the reaction!"))
  await msg.add_reaction("👍")
  await asyncio.sleep(2)
  await msg.clear_reactions() 
  await asyncio.sleep(2)
  await msg.add_reaction("👍")
  await asyncio.sleep(2)
  await msg.clear_reactions() 
  await asyncio.sleep(2)
  await msg.add_reaction("👍")
  await msg.clear_reactions()
  await asyncio.sleep(2)
  await msg.add_reaction("👍")
  def check(reaction, user):
    return user == ctx.author and str(reaction.emoji) == '👍'

  try:
      reaction, user = await bot.wait_for("reaction_add", check=check)
      await ctx.send("You caught the emoji :)")
      return
     
      
  except asyncio.TimeoutError:
    await ctx.channel.send("h")

    


        



  
  
 

       
  
  

     


  








@bot.command()
async def marry(ctx, member : discord.Member):

  
  msg = await ctx.channel.send((f"You {ctx.author.name} will accept {member.name} as your wedded wife?"))
  await msg.add_reaction(u"\u2705")
  await msg.add_reaction(u"\U0001F6AB")

  try:
        reaction, user = await bot.wait_for("reaction_add", check=lambda reaction, user: user == ctx.author and reaction.emoji in [u"\u2705", u"\U0001F6AB"], timeout=30.0)

  except asyncio.TimeoutError:
        await ctx.channel.send("Ouch you ignored the priest.")
        await voice.disconnect()
        return
  else:
        if reaction.emoji == u"\u2705":
          await asyncio.sleep(2)
          await ctx.channel.send("Ohk let's move forward")

        else:
            await asyncio.sleep(2)
            await ctx.channel.send(f"Sorry {member.name}, {ctx.author.name} don't want to marry you. i'm sorry.")
            await voice.disconnect()
            return
  if reaction.emoji == u"\u2705":
    await asyncio.sleep(2)
  msg = await ctx.send(f"Do you {member.name} accept {ctx.author.name } as your wedded husband?")
  await msg.add_reaction(u"\u2705")
  await msg.add_reaction(u"\U0001F6AB")

  try:
        reaction, user = await bot.wait_for("reaction_add", check=lambda reaction, user: user == member and reaction.emoji in [u"\u2705", u"\U0001F6AB"], timeout=30.0)

  except asyncio.TimeoutError:
        await ctx.channel.send("Ouch you ignored the priest.")
        await voice.disconnect()
        return
  else:
        if reaction.emoji == u"\u2705":
          await asyncio.sleep(2)
          await ctx.channel.send("Ohk you both may now kiss :kiss:")
        else:
            await asyncio.sleep(2)
            await ctx.channel.send(f"Sorry {ctx.author.name}, {member.name} don't want to marry you. i'm sorry.")
            await voice.disconnect()
            return

  await asyncio.sleep(2)         
  msg = await ctx.channel.send((f"Does anyone has any objections to their marriage?"))
  await msg.add_reaction(u"\u2705")
  await msg.add_reaction(u"\U0001F6AB")

  try:
        reaction, user = await bot.wait_for("reaction_add", check=lambda reaction, user: user == ctx.author and reaction.emoji in [u"\u2705", u"\U0001F6AB"], timeout=30.0)

  except asyncio.TimeoutError:
        await ctx.channel.send("Ouch you ignored the priest.")
        await voice.disconnect()
        return
  else:
        if reaction.emoji == u"\u2705":
          await asyncio.sleep(2)
          await ctx.channel.send(f"Ohk dude we can't help you. {member.name} is already married now, i'm just a priest.")
          await voice.disconnect()
          return

        else:
            await ctx.channel.send(f"Ohk good no one has objections to their marriage")
            await asyncio.sleep(2)
            await ctx.send(f"Congratulations 🎊 {ctx.author.name} and {member.name} are officially married now!")
            await asyncio.sleep(5)
            msg = await ctx.channel.send((f"sheeesh ||can i have my money now?||"))
  await msg.add_reaction(u"\u2705")
  await msg.add_reaction(u"\U0001F6AB")

  try:
        reaction, user = await bot.wait_for("reaction_add", check=lambda reaction, user: user == ctx.author and reaction.emoji in [u"\u2705", u"\U0001F6AB"], timeout=30.0)

  except asyncio.TimeoutError:
        await ctx.channel.send("Ouch you ignored the priest.")
        await voice.disconnect()
        return
  else:
        if reaction.emoji == u"\u2705":
          await asyncio.sleep(2)
          await ctx.channel.send(f"Yea thanks for the moni! this wedding was pretty easy for me || btw {member.name} were my crush but they married you ;-;||")
          await voice.disconnect()
          return

        else:
            await ctx.channel.send(f"Ohk get ready to be shocked this wedding was fake hahahhah your wife is mine now nerdddd.")
            await voice.disconnect()
            return
            

  counter = 0
  duration = 60   # In seconds
  while not counter >= duration:
    await asyncio.sleep(1)
    counter = counter + 1
  


      
  

    

    
   
  
  



  




  
  
  






  
  
  

  















@bot.command()
async def dm(ctx, member : discord.Member, *, word):
  await ctx.message.delete()
  embed = discord.Embed(title=f'{ctx.author.name} sent you a dm!', description=f"{word}")
  embed.set_footer(text=f"by {ctx.author.name}")
  await member.send(embed=embed)




                
                  

@bot.command(name="stats")
async def botstats(ctx):
		embed = Embed(title="Bot stats",
					  colour=ctx.author.colour,
					  thumbnail=bot.user.avatar_url,
					  timestamp=datetime.utcnow())

		proc = Process()
		with proc.oneshot():
			uptime = timedelta(seconds=time()-proc.create_time())
			cpu_time = timedelta(seconds=(cpu := proc.cpu_times()).system + cpu.user)
			mem_total = virtual_memory().total / (1024**2)
			mem_of_total = proc.memory_percent()
			mem_usage = mem_total * (mem_of_total / 100)

		fields = [
			("Bot version", "0.1.0", True),
			("Python version", "3.8", True),
			("discord.py version", discord_version, True),
			("Uptime", uptime, True),
			("CPU time", cpu_time, True),
			("Memory usage", f"{mem_usage:,.3f} / {mem_total:,.0f} MiB ({mem_of_total:.0f}%)", True),
			("Users", f"{len(bot.users)}", True)
		]

		for name, value, inline in fields:
			embed.add_field(name=name, value=value, inline=inline)

		await ctx.send(embed=embed)

@bot.command(case_insensitive = True, aliases = ["remind", "remindme", "remind_me"])
@commands.bot_has_permissions(attach_files = True, embed_links = True)
async def reminder(ctx, time, *, reminder):
    print(time)
    print(reminder)
    user = ctx.message.author
    embed = discord.Embed(color=0x55a7f7, timestamp=datetime.utcnow())
    embed.set_footer(text="If you have any questions, suggestions or bug reports, please join our support Discord Server by typing $invite ", icon_url=f"{ctx.author.avatar_url}")
    seconds = 0
    if reminder is None:
        embed.add_field(name='Warning', value='Please specify what do you want me to remind you about.') # Error message
    if time.lower().endswith("d"):
        seconds += int(time[:-1]) * 60 * 60 * 24
        counter = f"{seconds // 60 // 60 // 24} days"
    if time.lower().endswith("h"):
        seconds += int(time[:-1]) * 60 * 60
        counter = f"{seconds // 60 // 60} hours"
    elif time.lower().endswith("m"):
        seconds += int(time[:-1]) * 60
        counter = f"{seconds // 60} minutes"
    elif time.lower().endswith("s"):
        seconds += int(time[:-1])
        counter = f"{seconds} seconds"
    if seconds == 0:
        embed.add_field(name='Warning',
                        value='Please specify a proper duration, send `reminder_help` for more information.')
    elif seconds < 300:
        embed.add_field(name='Warning',
                        value='You have specified a too short duration!\nMinimum duration is 5 minutes.')
    elif seconds > 7776000:
        embed.add_field(name='Warning', value='You have specified a too long duration!\nMaximum duration is 90 days.')
    else:
        await ctx.send(f"Alright, I will remind you about {reminder} in {counter}.")
        await asyncio.sleep(seconds)
        await ctx.send(f"Hi {ctx.author.mention}, you asked me to remind you about {reminder} {counter} ago.")
        return
    await ctx.send(embed=embed)



def get_embed(_title, _description, _color):
    return discord.Embed(title=_title, description=_description, color=_color)


@bot.command()
async def findimposter(ctx):
        """Impostors can sabotage the reactor, 
        which gives Crewmates 30–45 seconds to resolve the sabotage. 
        If it is not resolved in the allotted time, The Impostor(s) will win."""


        # determining
        embed1 = discord.Embed(title = "Who's the imposter?" , description = "Find out who the imposter is, before the reactor breaks down!" , color=0xff0000)

        red = {
          "i didnt do any thing, i was in reactor",
          "i was in electric"
        }

        blue = {
          "i was in main hall way",
          "sorry i was checking my moms texting msg what happend now?"
        }

        lime = {
          "i was checking cams dont vote me :(",
          "vote red"
        }

        white = {
          "i have sus on lime",
          "it wasnt me dont vote me"
        }
        # fields
        embed1.add_field(name = 'Red' , value= '<:crewmate_red:916983562522222654>'   f" Red says - {random.choice(list(red))}", inline=False)
        embed1.add_field(name = 'Blue' , value= '<:crewmate_blue:916983564317368401>'  f" Blue says - {random.choice(list(blue))}" , inline=False)
        embed1.add_field(name = 'Lime' , value= '<:crewmate_lime:916983564137037825>'  f" Lime says - {random.choice(list(lime))}" , inline=False)
        embed1.add_field(name = 'White' , value= '<:crewmate_white:916983562257965086>'  f" White says - {random.choice(list(white))}" , inline=False)
        
        # sending the message
        msg = await ctx.send(embed=embed1)
        
        # emojis
        emojis = {
            'red': '<:crewmate_red:916983562522222654>',
            'blue': '<:crewmate_blue:916983564317368401>',
            'lime': '<:crewmate_lime:916983564137037825>',
            'white': '<:crewmate_white:916983562257965086>'
        }
        
        # who is the imposter?
        imposter = random.choice(list(emojis.items()))
        imposter = imposter[0]
        
        # for testing...
        print(emojis[imposter])
        
        # adding choices
        for emoji in emojis.values():
            await msg.add_reaction(emoji)
        
        # a simple check, whether reacted emoji is in given choises.
        def check(reaction, user):
            bot.reacted = reaction.emoji
            return user == ctx.author and str(reaction.emoji) in emojis.values()

    
        try: 
            reaction, user = await bot.wait_for('reaction_add', timeout=30.0, check=check)
        
        except asyncio.TimeoutError:
            # reactor meltdown - defeat
            description = "Reactor Meltdown.{0} was the imposter...".format(imposter)
            embed = get_embed("Defeat", description, discord.Color.red())
            await ctx.send(embed=embed)
        else:
            # victory
            if str(bot.reacted) == emojis[imposter]:
                description = "**{0}** was the imposter...".format(imposter)
                embed = get_embed("Victory", description, discord.Color.blue())
                await ctx.send(embed=embed)

            # defeat
            else:
                for key, value in emojis.items(): 
                    if value == str(bot.reacted):
                        description = "Reactor Mealted Down. **{0}** was not the imposter...".format(key)
                        embed = get_embed("Defeat", description, discord.Color.red())
                        await ctx.send(embed=embed)
                        break


@bot.command(aliases=["guildinfo", "si", "gi"])
async def serveri(ctx):
		embed = Embed(title="Server information",
					  colour=ctx.guild.owner.colour,
					  timestamp=datetime.utcnow())

		embed.set_thumbnail(url=ctx.guild.icon_url)
  

		statuses = [len(list(filter(lambda m: str(m.status) == "online", ctx.guild.members))),
					len(list(filter(lambda m: str(m.status) == "idle", ctx.guild.members))),
					len(list(filter(lambda m: str(m.status) == "dnd", ctx.guild.members))),
					len(list(filter(lambda m: str(m.status) == "offline", ctx.guild.members)))]

		fields = [("Name", f"{ctx.guild.name}", True),
          ("ID", ctx.guild.id, True),
				  ("Owner", ctx.guild.owner, True),
				  ("Region", ctx.guild.region, True),
				  ("Created at", ctx.guild.created_at.strftime("%d/%m/%Y %H:%M:%S"), True),
				  ("Members", len(ctx.guild.members), True),
				  ("Humans", len(list(filter(lambda m: not m.bot, ctx.guild.members))), True),
				  ("Bots", len(list(filter(lambda m: m.bot, ctx.guild.members))), True),
				  ("Banned members", len(await ctx.guild.bans()), True),
				  ("Statuses", f"🟢 {statuses[0]} 🟠 {statuses[1]} 🔴 {statuses[2]} ⚪ {statuses[3]}", True),
				  ("Text channels", len(ctx.guild.text_channels), True),
				  ("Voice channels", len(ctx.guild.voice_channels), True),
				  ("Categories", len(ctx.guild.categories), True),
				  ("Roles", len(ctx.guild.roles), True),
				  ("Invites", len(await ctx.guild.invites()), True),
				  ("\u200b", "\u200b", True)]

		for name, value, inline in fields:
			embed.add_field(name=name, value=value, inline=inline)

		await ctx.send(embed=embed)



@bot.command()
@commands.guild_only()
async def emoji(ctx: commands.Context, emoji: discord.PartialEmoji):
    """This clones a specified emoji that only specified roles
    are allowed to use.
    """

    # fetch the emoji asset and read it as bytes.
    emoji_bytes = await emoji.url.read()

    # the key parameter here is `roles`, which controls
    # what roles are able to use the emoji.
    await ctx.guild.create_custom_emoji(
        name=emoji.name,
        image=emoji_bytes,
        reason='Very secret business.'
  
    )
    await ctx.send("emoji created!")


@bot.command()
async def fortune(ctx):
        """Get your fortune read, not as authentic as a fortune cookie."""
        await ctx.send("```{}```".format(random.choice(fortunes)))


fight_results = [
    "and it was super effective!",
    "but %user% dodged it!",
    "and %user% got obliterated!",
    "but %attacker% missed!",
    "but they killed each other!",
    "and it wiped out everything within a five mile radius!",
    "but in a turn of events, they made up and became friends. Happy ending!",
    "and it worked!",
    "and %user% never saw it coming.",
    ",but %user% grabbed the attack and used it against %attacker%!",
    "but it only scratched %user%!",
    "and %user% was killed by it.",
    "but %attacker% activated %user%'s trap card!",
    "and %user% was killed!"
]

@bot.command()
async def fight(ctx, user:str=None, *, weapon:str=None):
        """Fight someone with something"""
        if user is None or user.lower() == ctx.author.mention or user == ctx.author.name.lower() or ctx.guild is not None and ctx.author.nick is not None and user == ctx.author.nick.lower():
            await ctx.send("{} fought themself but only ended up in a mental hospital!".format(ctx.author.name))
            return
        if weapon is None:
            await ctx.send("{0} tried to fight {1} with nothing so {1} beat the breaks off of them!".format(ctx.author.name, user))
            return
        await ctx.send("{} used **{}** on **{}** {}".format(ctx.author.name, weapon, user, random.choice(fight_results).replace("%user%", user).replace("%attacker%", ctx.author.name)))

@commands.guild_only()
@bot.command()
async def getemotes(ctx):
        """Gets a list of the server's emotes"""
        emotes = ctx.guild.emojis
        if len(emotes) == 0:
            await ctx.send(get("information.no_server_emotes", ctx))
            return
        emotes = ["`:{}:` = {}".format(emote.name, emote) for emote in emotes]
        await ctx.send("\n".join(emotes))

def make_list_embed(fields):
    embed = discord.Embed(description="\u200b")
    for key, value in fields.items():
        embed.add_field(name=key, value=value, inline=True)
    return embed

def get_avatar(user, animate=True):
    if user.avatar_url:
        avatar = str(user.avatar_url).replace(".webp", ".png")
    else:
        avatar = str(user.default_avatar_url)
    if not animate:
        avatar = avatar.replace(".gif", ".png")
    return avatar

@bot.command()
async def spotify(ctx, user:discord.Member=None):
        """Get the current song that you or another user is playing"""
        if user is None:
            user = ctx.author
        activity = ctx.author.activity
        if activity is None:
            await ctx.send("{} is not playing anything on spotify!".format(user.display_name))
            return
        if activity.type == discord.ActivityType.listening and activity.name == "Spotify":
            embed = discord.Embed(description="\u200b")
            embed.add_field(name="Artists", value=", ".join(activity.artists))
            embed.add_field(name="Album", value=activity.album)
            embed.add_field(name="Duration", value=str(activity.duration)[3:].split(".", 1)[0])
            embed.title = "**{}**".format(activity.title)
            embed.set_thumbnail(url=activity.album_cover_url)
            embed.url = "https://open.spotify.com/track/{}".format(activity.track_id)
            embed.color = activity.color
            embed.set_footer(text="{} - is currently playing this song".format(ctx.author.display_name),
            icon_url=get_avatar(ctx.author))
            await ctx.send(embed=embed)
        else:
            await ctx.send("{} is not playing anything on spotify!".format(user.display_name))
            return

def download_file(url, destination):
    req = requests.get(url)
    file = open(destination, "wb")
    for chunk in req.iter_content(100000):
        file.write(chunk)
    file.close()

def url_to_bytes(url):
    data = requests.get(url)
    content = io.BytesIO(data.content)
    filename = url.rsplit("/", 1)[-1]
    return {"content":content, "filename":filename}

@bot.command()
async def catty(ctx):
        """Shows a random cat"""
        # Watch Nero spam this command until the bot crashes
        await ctx.channel.trigger_typing()
        cat = requests.get("https://api.thecatapi.com/v1/images/search", headers={"x-api-key": "3ee5e324-0ff5-4c34-9a4a-5821bc66dde1"})
        url = cat.json()[0]["url"]
        await ctx.send(url)

units = 12
def function ():
 ("units =", units, "glasses")

ratio1 = 2
ratio2 = 13.52
ratio3 = 1
spoon1 = ratio1 * units
spoon2 = ratio2 * units
spoon3 = ratio3 * units

@bot.command()
async def rat(ctx):
  msg = await ctx.channel.send((f"you need {spoon1} tablespoons of sugar"))
 

@bot.command()
async def servers(ctx):
        for guild in activeserver:
          activeservers=bot.guilds
          await ctx.send(guild.name)
           




@bot.command()
async def blackandwhite(ctx, user:discord.Member=None):
        """Turns your avatar or the specified user's avatar black and white"""
        await ctx.channel.trigger_typing()
        if user is None:
            user = ctx.author
        download_file(get_avatar(user, animate=False), "data/blackandwhite.png")
        avatar = Image.open("data/blackandwhite.png").convert("L")
        avatar.save("data/blackandwhite.png")
        await ctx.send(file=discord.File("data/blackandwhite.png"))

@bot.command()
async def spellout(ctx, *, msg:str):
        """S P E L L O U T"""
        await ctx.send(" ".join(list(msg.upper())))

@bot.command()
async def weirdshit(ctx):
        """WHY ARE YOU POSTING WEIRD SHIT?!?!?!"""
        await ctx.channel.trigger_typing()
        await ctx.send(file=discord.File("./images/weirdshit.jpg"))

@bot.command()
async def delete(ctx):
        """Delet this"""
        await ctx.channel.trigger_typing()
        await ctx.send(file=discord.File("./images/delet_this.png"))

@bot.command()
async def tableflip(ctx):
        # I hope this unicode doesn't break
        """(╯°□°）╯︵ ┻━┻"""
        await ctx.channel.trigger_typing()
        await ctx.send(file=discord.File("./images/tableflip.gif"))


@bot.command()
async def links(ctx):
  em = discord.Embed(title="Vote Hook :link: ", description=" [Vote me!](https://top.gg/bot/756715507306201130/vote)",color=ctx.author.color,timestamp=ctx.message.created_at)
  em.set_author(name=ctx.author.name, icon_url=ctx.author.avatar_url)
  em.set_thumbnail(url="https://www.tenterdentowncouncil.gov.uk/image/links1.jpg")
  em.add_field(name="Website links! :link:", value="[website!](https://captain-hook-bot.vercel.app/) | [My top.gg page!](https://top.gg/bot/756715507306201130)")
  em.add_field(name="Invite Hook :link:", value="[Invite me!](https://discord.com/api/oauth2/authorize?client_id=756715507306201130&permissions=8&scope=bot)",inline=False)
  em.add_field(name="Other links :link:", value="[Support Server!](https://discord.gg/GQpAfdkEFs)",inline=False)
  await ctx.send(embed=em)


@bot.command()
async def vote(ctx):
  em = discord.Embed(title="Vote for Captain Hook! :link: ", description=" [Vote me!](https://top.gg/bot/916960367018651678/vote) | [My top.gg page!](https://top.gg/bot/916960367018651678)",color=ctx.author.color,timestamp=ctx.message.created_at)
  em.set_author(name=ctx.author.name, icon_url=ctx.author.avatar_url)
  em.set_thumbnail(url="https://cdn.discordapp.com/avatars/756715507306201130/f649d32cf02ebc5dbc821ba13972cba6.webp?size=1024")
  em.add_field(name="Other links! :link:", value="[Website!]( https://captain-hook-bot.vercel.app/) | [Invite me!](https://discord.com/api/oauth2/authorize?client_id=916960367018651678&permissions=8&scope=bot%20applications.commands) | [Support Server!](https://discord.gg/MyneuXgVRr)")
  await ctx.send(embed=em)

  

@bot.command(name='guess')
async def guess(ctx):
    def check(m):
        return m.author == ctx.author and m.channel == ctx.message.channel

    number = random.randint(1, 10)
    await ctx.send('I have a number in mind between 1 and 10, you have 5 tries')

    for i in range(0, 5):
        guess = await bot.wait_for('message', check=check)

        if guess.content < str(number):
         await ctx.send('Higher!')

        elif guess.content > str(number):
            await ctx.send('Lower!')

        else:
            await ctx.send('You got the number!')

            return
    else:
        await ctx.send("You lost, type $guess to play again.")
        await ctx.send("The number I was thinking of was " + str(number) + ".")
  



@bot.command()
@commands.bot_has_guild_permissions(ban_members=True)
@commands.has_guild_permissions(ban_members=True)
async def unban(ctx, target: discord.User, *, reason:str = None):
    try:
        await ctx.guild.fetch_ban(target)
    except discord.NotFound:
        return await ctx.send('That user is not banned')
    await ctx.guild.unban(target, reason=reason)
    await ctx.send(embed=discord.Embed(title=':unlock: Member Unbanned :',description=(f'{target.mention} has been unbanned \nReason: 'f'{reason}'), color = discord.Color.green()))

import base64
@bot.command(aliases = ['encodeimg'])
async def imgen(ctx):
        """Encode an Image into text (for decoding later)"""
        if len(ctx.message.attachments) <= 0:
            await ctx.send(embed = discord.Embed(description = "Make sure your msg have an image attached with it.", color = discord.Colour.red()),delete_after = 6)
            return
        url = ctx.message.attachments[0].url    
        ss = url.encode("ascii") 
        base64_bytes = base64.b64encode(ss) 
        base64_string = base64_bytes.decode("ascii") 
        base64_string = base64_string.replace("==", "")
        embed = discord.Embed(title = "Image Encoded", description = f"```{base64_string}```", color =  discord.Color.green())
        embed.set_footer(text="type .imgdec + encoded_code to get the decoded image")
        await ctx.send(embed = embed)

@bot.command(aliases = ['decodeimg'])
async def imgdec(ctx,*,string):
        """Decode a Encoded string (text)"""
        string = f"{string}=="
        try:
            base64_bytes = string.encode("ascii") 
            sample_string_bytes = base64.b64decode(base64_bytes) 
            sample_string = sample_string_bytes.decode("ascii") 
            embed = discord.Embed(color = 0xFFC5A8)
            embed.set_image(url = sample_string)
            embed.set_author(name = ctx.author.name,url = ctx.author.avatar_url)
            await ctx.send(embed = embed)
        except Exception as e:
            await ctx.send(embed = discord.Embed(description = "Couldn't Decode the Code, make sure that you didn't have a typo.", color = discord.Colour.red()))

@bot.command(aliases = ['enc'])
async def encode(ctx, *, string):
        """Encode a message (text) """
        try:
            ss = string.encode("ascii") 
            base64_bytes = base64.b64encode(ss) 
            base64_string = base64_bytes.decode("ascii") 
            embed = discord.Embed(color = discord.Color.green())
            embed.add_field(name = "Encoded - ", value = f"```{base64_string}```")
            embed.set_author(name = ctx.author, icon_url = ctx.author.avatar_url)
            embed.set_footer(text="Type $decode + encoded_value to get the translation")
            await ctx.send(embed = embed)
        except Exception as e:
            await ctx.send(e)
            await ctx.send(embed = discord.Embed(description = "Couldn't Encode the given string.", color = discord.Colour.red()))

@bot.command(aliases = ['dec'])
async def decode(ctx,*,string):
        """Decode an encoded text"""
        try:
            base64_bytes = string.encode("ascii") 
            sample_string_bytes = base64.b64decode(base64_bytes) 
            sample_string = sample_string_bytes.decode("ascii")
            embed = discord.Embed(color = discord.Color.green())
            embed.add_field(name = "Decoded - ", value = f"```{sample_string}```")
            embed.set_author(name = ctx.author, icon_url = ctx.author.avatar_url)
            await ctx.send(embed= embed)
        except:
            await ctx.send(embed = discord.Embed(description = "Couldn't Decode the Code, make sure that you didn't have a typo.",color =discord.Colour.red()))




@bot.command()
async def tea(ctx, member: discord.Member =None):
        """Enjoy coffee with someone"""
        if member == ctx.author or not member:
            await ctx.send(embed=discord.Embed(description=f"🍵 | {ctx.author.name} Enjoying tea alone :smirk: ", color=discord.Color.random()))
            return
        elif member == bot.user:
            await ctx.send(embed=discord.Embed(description="🍵 | Don't worry I will drink tea with you *sips*", color=discord.Color.random()))
            return
        elif member.bot: return;

        coffee_offer = f"🍵 | {member.mention}, you got a tea offer from {ctx.author.name}"
        coffee_msg = await ctx.send(embed=discord.Embed(description=coffee_offer,color=discord.Color.random()))
        await coffee_msg.add_reaction('🍵')

        def check(reaction, user):
            return user == member and str(reaction.emoji) == '🍵'

        try:
            await bot.wait_for('reaction_add', timeout=60.0, check=check)
        except asyncio.TimeoutError:
            await ctx.send(embed=discord.Embed(description=f"Looks like {member.name} are busy", color=discord.Color.random()))
        else:
            await coffee_msg.delete()
            await ctx.send(embed=discord.Embed(description=f"🍵 | Yay! {ctx.author.name} and {member.name} are enjoying tea together!", color=discord.Color.random()))



@bot.command()
async def roast(ctx,member:discord.Member):
        """Roast a member"""
        if str(member)=="Hakashi Katake#8459":
            await ctx.send("You trying to roast my owner!? give up alr baka ;)")
            return
        roast = random.choice(roasts)
        embed=discord.Embed(title=f"Lmao you got Roasted! ",description=f"{member.name}: Don't you dare roast me \n\n {ctx.author.name}: Lmao i just did take this -> {roast}",color=discord.Color.random())
        embed.set_footer(text="Lmao look at the looser, he can't roast others by him self. that's why he is using me to roast them.")
        await ctx.send(embed=embed)

@bot.command()
async def ques(ctx,*,ques):
        """Ask/search for a question"""
        emerror = discord.Embed(title ="No result found !! :sob:",color = discord.Color.red())
        ques = ques.lower()
        if "who made you" in ques or "who created you" in ques or "who is your creator"in ques :
            em = discord.Embed(title = f"Question : "+ ques +":question:",
                        description = f"answer : "+ "I was made by Hakashi Katake the great right in his PC!! LOL"+ ":exclamation:",color = discord.Color.random())
            await ctx.send(embed = em) 
        elif "what's your website" in ques or "whats your website" in ques or "your website"in ques :
          em = discord.Embed(title = f"Question : "+ ques +":question:",
                        description = f"answer : "+ "My website? Oh yea i do have a website here -> https://captain-hook-bot.vercel.app/" ,color = discord.Color.random())
          await ctx.send(embed = em)               
         
        else: 
            try:
                res = client1.query(ques)
                answer = next(res.results).text
            
                em = discord.Embed(title = f"Question : "+ ques +":question:",
                            description = f"answer : "+ str(answer)+ ":exclamation:",color = discord.Color.random())
                await ctx.send(embed = em)  
            except:
                await ctx.send(embed = emerror)        


from pytube import YouTube











@bot.command()
async def anime(ctx,*,query=None):
    try:
      anime = animec.Anime(query)
    except:
      await ctx.send(embed=discord.Embed(description="No corresponding anime is found from the search query. Please check if you entered the correct name of the anime.",color=discord.Color.random()))
      return
    if query == None:
      await ctx.send("Try searching an anime .-.")
    
    
    if anime.is_nsfw():
      embed1=discord.Embed(title=anime.title_english,url=anime.url,description=f"{anime.description}...",color=discord.Color.random())
      embed1.add_field(name="Episodes",value = str(anime.episodes))
      embed1.add_field(name="Rating",value = str(anime.rating))
      embed1.add_field(name="Broadcast",value = str(anime.broadcast))
      embed1.add_field(name="Status",value = str(anime.status))
      embed1.add_field(name="Type",value = str(anime.type))
      embed1.add_field(name="NSFW Status",value = str(anime.is_nsfw()))
      embed1.add_field(name="Genres",value = str(anime.genres))
      embed1.add_field(name="Aired",value = str(anime.aired))
      embed1.add_field(name="Ranked",value = str(anime.ranked))
      embed1.add_field(name="Teaser",value = f"[Anime's Teaser]({anime.teaser})")
      embed1.add_field(name= "Studios",value = str(anime.producers))
      embed1.add_field(name= "Alt titles",value = str(anime.alt_titles))
      embed1.add_field(name= "Recommendations",value = f"Because you searched for {anime.title_english}: {list(anime.recommend())[:3]}")
      await ctx.send(embed=embed1)

    else:
      embed=discord.Embed(title=f"{anime.title_english} ({anime.title_jp})",url= anime.url,description=f"{anime.description}...",color=discord.Color.random())
      embed.add_field(name="Episodes",value = str(anime.episodes))
      embed.add_field(name="Rating",value = str(anime.rating))
      embed.add_field(name="Broadcast",value = str(anime.broadcast))
      embed.add_field(name="Status",value = str(anime.status))
      embed.add_field(name="Type",value = str(anime.type))
      embed.add_field(name="NSFW Status",value = str(anime.is_nsfw()))
      embed.add_field(name="Genres",value = str(anime.genres))
      embed.add_field(name="Aired",value = str(anime.aired))
      embed.add_field(name="Ranked",value = str(anime.ranked))
      embed.add_field(name= "Studios",value = str(anime.producers))
      embed.add_field(name= "Alt titles",value = str(anime.alt_titles))
      embed.add_field(name= "Recommendations",value = f"Because you searched for {anime.title_english}: {list(anime.recommend())[:3]}")
      embed.set_thumbnail(url=anime.poster)
      await ctx.send(embed=embed)



  

    



@bot.command()
async def char(ctx,*,query):
  try:
    char = animec.Charsearch(query)

  except:
    await ctx.send(embed=discord.Embed(description="No corresponding Anime Character is found from the search query",color=discord.Color.red()))
    return  
    embed=discord.Embed(title=char.title,url= char.url,color=discord.Color.random())
    embed.set_image(url=char.image_url)
    embed.set_footer(text=", ".join(list(char.references.keys())[:2]))
    await ctx.send(embed=embed)

    




@bot.command()
async def aninews(ctx, amount:int=3):
  news=animec.Aninews(amount)
  links=news.links
  titles=news.titles
  description=news.description

  embed=discord.Embed(title="Latest Anime News",color=discord.Color.random(),timestamp=datetime.datetime.utcnow())
  embed.set_thumbnail(url=news.images[0])

  for i in range(amount):
    embed.add_field(name=f"{i+1}) {titles[i]}",value=f"{description[i][:200]}...\n[Read more]({links[i]})",inline=False)
  await ctx.send(embed=embed)

def nsfw_check(images):
    nsfw_links = {'https://emojis.slackmojis.com/emojis/images/1528400660/4042/boob.png?1528400660',
                  'https://emojis.slackmojis.com/emojis/images/1533408970/4386/dildo.png?1533408970',
    }

    images = set(images)
    common = nsfw_links.intersection(images)
    if len(common) != 0: return True
    else: return False

answering = False
riddle = ""
riddleAnswer = ""
riddleLine = 0
riddleGuessesLeft = 3
prevRiddleLine = 0

@bot.command()
async def riddle(ctx):
    global riddle, riddleLine, prevRiddleLine, riddleAnswer, riddleGuessesLeft, answering
    answering = True
    riddle = ""
    riddleAnswer = ""
    riddleGuessesLeft = 3

    with open("riddles.txt", "r") as f:
        lines = f.readlines()
    while riddle == "" or "=" in riddle or riddleLine == prevRiddleLine:
        riddleLine = random.randrange(0, len(lines))
        riddle = lines[riddleLine]
        riddleAnswer = lines[riddleLine+1]
    prevRiddleLine = riddleLine
    f.close()

    riddleAnswer = riddleAnswer.replace("=", "")
    riddleAnswer = riddleAnswer.replace(" ", "")

    embed=discord.Embed(title="Welcome to Multiplayer Riddle Game!",description="All answers to these riddles will be one word or number. You have three guesses per riddle.", color=discord.Color.random())
    embed.add_field(name="Riddle",value="" + ""+riddle+"")
    embed.add_field(name="Usage",value="Use $answer <word> to solve the riddle.",inline=False)
    embed.set_thumbnail(url="https://image.winudf.com/v2/image1/Y29tLmd2YXBwcy5yaWRkbGVzX2ljb25fMTYyNTIzMzM3M18wOTk/icon.png?w=&fakeurl=1")
    await ctx.send(embed=embed)
    print(riddleAnswer)



    
  
    
    
    

@bot.command()
async def answer(ctx, *,userAnswer):
    global riddleAnswer, riddleGuessesLeft, answering

    if answering is False:
        await ctx.send("Use $riddle to receive another riddle")
        return

    userAnswer = userAnswer.strip()
    riddleAnswer = riddleAnswer.strip()

    if str.lower(userAnswer) == str.lower(riddleAnswer):

        embed=discord.Embed(title="You won the game",description="Ooo Look at the pro answering")
        await ctx.send(embed=embed)
        answering = False
    else:
        riddleGuessesLeft -= 1
        embed=discord.Embed(title="Guesses left",description="Incorrect!  Guesses left:" + str(riddleGuessesLeft))
        await ctx.send(embed=embed)
    if riddleGuessesLeft == 0:
      embed=discord.Embed(title="Out of guesses!",description="The answer was: " + riddleAnswer)
      await ctx.send(embed=embed)

        




gmOptionEnabled = False
@bot.command()
async def morninggreet(onOrOff):
    global gmOptionEnabled
    if str.lower(onOrOff) == "on" and gmOptionEnabled == False:
        gmOptionEnabled = True
        await bot.say("PartyBot will now greet people when they say good morning")
    elif str.lower(onOrOff) == "off" and gmOptionEnabled == True:
        gmOptionEnabled = False
        await bot.say("PartyBot will no longer greet people when they say good morning")

playingRPS = False
aiChoice = 0
playerChoice = 0
aiPoints = 0
playerPoints = 0

@bot.command()
async def rps(ctx):
    await ctx.send("Type $choose rock/paper/scissors to make your choice for the round.  First to 3 points wins! ")
    global playingRPS
    playingRPS = True

@bot.command()
async def choose(ctx, *,rockPaperOrScissors):
    global playingRPS, aiChoice, playerChoice, aiPoints, playerPoints

    if playingRPS is False:
        await ctx.send("Type $rps to play a game of rock paper scissors!")
        return

    #AI choice
    aiChoice = random.randrange(1,4)
    choiceList = {1:"rock", 2:"paper", 3:"scissors"}

    #Player choice
    if str.lower(rockPaperOrScissors) == "rock": playerChoice = 1
    if str.lower(rockPaperOrScissors) == "paper": playerChoice = 2
    if str.lower(rockPaperOrScissors) == "scissors": playerChoice = 3

    #See who won
    await ctx.send("You picked: " + rockPaperOrScissors + " and AI picked: " + choiceList[aiChoice] + ".")
    if playerChoice == 1 and aiChoice == 3 or playerChoice == 2 and aiChoice == 1 or playerChoice == 3 and aiChoice == 2:
        playerPoints += 1
        await ctx.send("You win the round!")
    elif playerChoice == aiChoice:
        await ctx.send("Tie!")
    else:
        aiPoints += 1
        await ctx.send("AI wins the round!")

    #End game if someone hit 3 points
    if playerPoints == 3:
        await ctx.send("You hit 3 points. You win!")
        await endRPS()
        return
    if aiPoints == 3:
        await ctx.send("AI hit 3 points. You lose!")
        await endRPS()
        return
    await ctx.send("Type $choose <rock/paper/scissors> to continue. ")
    await ctx.send(f"SCORE -> {ctx.author.name}: " + str(playerPoints) + " AI: " + str(aiPoints))

async def endRPS():
    global playingRPS, aiChoice, playerChoice, aiPoints, playerPoints
    playingRPS = False
    aiChoice = 0
    playerChoice = 0
    aiPoints = 0
    playerPoints = 0

word = ""
guessesLeft = 6
playingHangman = False
blanks = []
guessedLetters=[]
lettersFound = 0

@bot.command()
async def hangman(ctx):
    global playingHangman, word, guessesLeft, blanks, lettersFound, guessedLetters
    lines = []
    with open("hangmanwords.txt", "r") as f:
        lines = f.readlines()
    random_line_num = random.randrange(0, len(lines))
    word = lines[random_line_num]
    f.close()
    blanks = []
    guessedLetters = []
    lettersFound = 0
    guessesLeft = 6
    playingHangman = True
    for i in range(1, len(word)):
        blanks .append("-")
  
    
    embed=discord.Embed(title="Welcome to hangman.",description="You have " + str(guessesLeft) + " ""guesses to get all of the letters in the word. The word is replaced with '-'. Let's see if you can find it.")
    embed.add_field(name="Word", value=" ".join(blanks))
    embed.add_field(name="Usage", value="To guess a letter, type $hguess letter",inline=False)
    embed.set_thumbnail(url="https://d338t8kmirgyke.cloudfront.net/icons/icon_pngs/000/001/955/original/hangman.png")
    await ctx.send(embed=embed)
    print(word)

    


@bot.command()
async def hguess(ctx, *,guess):
    global playingHangman
    global word
    global guessesLeft
    global blanks
    global lettersFound
    global guessedLetters
    if playingHangman is True:
        if str.isalpha(guess) and len(guess) == 1 and str.lower(guess) not in guessedLetters:
            if str.lower(guess) in word:
                guessedLetters.append(str.lower(guess))
                embed=discord.Embed(title="Word Found!",description=guess + " is in the word. Good job!",color=discord.Color.random())
                embed.add_field(name="Word needed to be found!",value=" ".join(blanks),inline=False)
                embed.add_field(name="Guessed letters",value="" + " ".join(guessedLetters),inline=False)
                embed.add_field(name="Guesses left",value="" + str(guessesLeft),inline=False)
                await ctx.send(embed=embed)
                for i in range(0, len(word)):
                    if word[i] == str.lower(guess):
                        blanks[i] = str.lower(guess)
                        lettersFound += 1

            else:
                embed1=discord.Embed(title="Oops try again!",description=guess + " is not in the word.",color=discord.Color.random())
                embed1.add_field(name="Word needed to be found!",value=" ".join(blanks),inline=False)
                embed1.add_field(name="Guessed letters",value="" + " ".join(guessedLetters),inline=False)
                embed1.add_field(name="Guesses left",value="" + str(guessesLeft),inline=False)
                await ctx.send(embed=embed1)
                guessesLeft -= 1

            
            #print(lettersFound)
            

            if guessesLeft == 0:
                embed=discord.Embed(title="No guesses left",description=f"You lose! the word was {word}",color=discord.Color.random())
                embed.add_field(name="Better luck next time!",value="To play hangman again use $hangman to start a new game!")
                await ctx.send(embed=embed)
                playingHangman = False
            if lettersFound == len(word)-1:
                embed=discord.Embed(title="You guessed all the letters!",description="You've won! The word was: " + word,color=discord.Color.random())
                embed.add_field(name="Wow! you really play well.",value="I'll try to find more difficult word next time, use $hangman to start a new game!")
                await ctx.send(embed=embed)
                playingHangman = False

        else:
            embed3=discord.Embed(title="ERROR :x:",description="You can only guess with single letters that haven't already been entered.",color=discord.Color.random())
            embed3.add_field(name="Guessed letters",value="" + " ".join(guessedLetters))
            await ctx.send(embed=embed3)

    else:

        embed=discord.Embed(title="ERROR :x:",description="Start a game of Hangman with $hangman before trying to guess a letter!",color=discord.Color.random())
        await ctx.send(embed=embed)

@bot.command()
async def hend(ctx):
  await ctx.send("Hangman game ended!")
  playingHangman = False

enemies = ["goblin","blob"]
attacks = ["punch","slash"]


@bot.command()
async def battle(ctx):
    turn = 0
    aut = 5
    ops = 5
    user = ctx.author
    cmam = (random.choice(enemies))
    att = (random.choice(attacks))
    await ctx.send(f"{cmam} vs {user}, who will win?")
    while aut > 0 and ops > 0:

            if turn == 0:
                await ctx.send(f"{user}: `Punch, Heal, Surrender`")
                def check(m):
                    return m.content == "punch" or m.content == 'heal' or m.content == 'surrender' and m.author == ctx.message.author
                response = await bot.wait_for('message', check = check)
                if "punch" in response.content.lower():
                  if ops > 0:
                    dmg = [0, 1, 2]
                    dmg = (random.choice(dmg))
                    ops = ops - dmg
                    await ctx.send(f"{cmam} is down to **{ops}** health")
                    turn = turn + 1
                    if ops <= 0:
                        await ctx.send(f"**{user} has won the battle**")
                        break
                elif ops <= 0:
                    await ctx.send(f"**{user} has won the battle**")
                    break
                if "heal" in response.content.lower():
                  if aut >= 5:
                    await ctx.send(f"{user} already has **{aut}** health, they lose a turn")
                    turn = turn + 1
                else:
                    aut = aut + 1
                    await ctx.send(f"{user} now has **{aut}** health")
                if "surrender" in response.content.lower():
                  await ctx.send(f"{user} has surrendered with **{aut}** health. {cmam} has claimed victory with **{ops}** health remaining")
                  aut = aut - 20
                  ops = ops - 20
                  break
            elif turn == 1:
                await ctx.send(f" its {cmam}'s turn now")
                if att == "punch" and turn == 1:
                  if ops > 0:
                    dmg = [0, 1, 2]
                    dmg = (random.choice(dmg))
                    ops = ops - dmg
                    await ctx.send(f"{cmam} uses {att} on {user} dealing {dmg} on them! {user} is down to **{ops}** health")
                    turn = turn - 1
                    if ops <= 0:
                        await ctx.send(f"**{cmam} has won the battle**")      
                elif att == "slash" and turn == 1:
                  if ops > 0:
                    dmg = [0, 1, 2]
                    dmg = (random.choice(dmg))
                    ops = ops - dmg
                    await ctx.send(f"{cmam} uses {att} on {user}  dealing {dmg} on them! {user} is down to **{ops}** health")
                    turn = turn - 1
                    if ops <= 0:
                        await ctx.send(f"**{cmam} has won the battle**")
                        





















from discord.ext.commands import clean_content  






@bot.command()
async def ball(ctx, *, _ballInput: clean_content):
        """extra generic just the way you like it"""
        choiceType = random.choice(["(Affirmative)", "(Non-committal)", "(Negative)"])
        if choiceType == "(Affirmative)":
            prediction = random.choice(["It is certain ", 
                                        "It is decidedly so ", 
                                        "Without a doubt ", 
                                        "Yes, definitely ", 
                                        "You may rely on it ", 
                                        "As I see it, yes ",
                                        "Most likely ", 
                                        "Outlook good ", 
                                        "Yes ", 
                                        "Signs point to yes "]) + ":8ball:"

            emb = (discord.Embed(title="Question: {}".format(_ballInput), colour=0x3be801, description=prediction))
        elif choiceType == "(Non-committal)":
            prediction = random.choice(["Reply hazy try again ", 
                                        "Ask again later ", 
                                        "Better not tell you now ", 
                                        "Cannot predict now ", 
                                        "Concentrate and ask again "]) + ":8ball:"
            emb = (discord.Embed(title="Question: {}".format(_ballInput), colour=0xff6600, description=prediction))
        elif choiceType == "(Negative)":
            prediction = random.choice(["Don't count on it ", 
                                        "My reply is no ", 
                                        "My sources say no ", 
                                        "Outlook not so good ", 
                                        "Very doubtful "]) + ":8ball:"
            emb = (discord.Embed(title="Question: {}".format(_ballInput), colour=0xE80303, description=prediction))
        emb.set_author(name='Magic 8 ball', icon_url='https://www.horoscope.com/images-US/games/game-magic-8-ball-no-text.png')
        await ctx.send(embed=emb)

@bot.command(aliases=['gay-scanner', 'gayscanner', 'gay'])
async def gay_scanner(ctx,* ,user: clean_content=None):
        """very mature command yes haha"""
        if not user:
            user = ctx.author.name
        gayness = random.randint(0,100)
        if gayness <= 33:
            gayStatus = random.choice(["No homo", 
                                       "Wearing socks", 
                                       '"Only sometimes"', 
                                       "Straight-ish", 
                                       "No homo bro", 
                                       "Girl-kisser", 
                                       "Hella straight"])
            gayColor = 0xFFC0CB
        elif 33 < gayness < 66:
            gayStatus = random.choice(["Possible homo", 
                                       "My gay-sensor is picking something up", 
                                       "I can't tell if the socks are on or off", 
                                       "Gay-ish", 
                                       "Looking a bit homo", 
                                       "lol half  g a y", 
                                       "safely in between for now"])
            gayColor = 0xFF69B4
        else:
            gayStatus = random.choice(["LOL YOU GAY XDDD FUNNY", 
                                       "HOMO ALERT", 
                                       "MY GAY-SENSOR IS OFF THE CHARTS", 
                                       "STINKY GAY", 
                                       "BIG GEAY", 
                                       "THE SOCKS ARE OFF", 
                                       "HELLA GAY"])
            gayColor = 0xFF00FF
        emb = discord.Embed(description=f"Gayness for **{user}**", color=gayColor)
        emb.add_field(name="Gayness:", value=f"{gayness}% gay")
        emb.add_field(name="Comment:", value=f"{gayStatus} :kiss_mm:")
        emb.set_author(name="Gay-Scanner™", icon_url="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/ICA_flag.svg/2000px-ICA_flag.svg.png")
        await ctx.send(embed=emb)



@bot.command()
async def ship(ctx, name1 : clean_content, name2 : clean_content):
        shipnumber = random.randint(0,100)
        if 0 <= shipnumber <= 10:
            status = "Really low! {}".format(random.choice(["Friendzone ;(", 
                                                            'Just "friends"', 
                                                            '"Friends"', 
                                                            "Little to no love ;(", 
                                                            "There's barely any love ;("]))
        elif 10 < shipnumber <= 20:
            status = "Low! {}".format(random.choice(["Still in the friendzone", 
                                                     "Still in that friendzone ;(", 
                                                     "There's not a lot of love there... ;("]))
        elif 20 < shipnumber <= 30:
            status = "Poor! {}".format(random.choice(["But there's a small sense of romance from one person!", 
                                                     "But there's a small bit of love somewhere", 
                                                     "I sense a small bit of love!", 
                                                     "But someone has a bit of love for someone..."]))
        elif 30 < shipnumber <= 40:
            status = "Fair! {}".format(random.choice(["There's a bit of love there!", 
                                                      "There is a bit of love there...", 
                                                      "A small bit of love is in the air..."]))
        elif 40 < shipnumber <= 60:
            status = "Moderate! {}".format(random.choice(["But it's very one-sided OwO", 
                                                          "It appears one sided!", 
                                                          "There's some potential!", 
                                                          "I sense a bit of potential!", 
                                                          "There's a bit of romance going on here!", 
                                                          "I feel like there's some romance progressing!", 
                                                          "The love is getting there..."]))
        elif 60 < shipnumber <= 70:
            status = "Good! {}".format(random.choice(["I feel the romance progressing!", 
                                                      "There's some love in the air!", 
                                                      "I'm starting to feel some love!"]))
        elif 70 < shipnumber <= 80:
            status = "Great! {}".format(random.choice(["There is definitely love somewhere!", 
                                                       "I can see the love is there! Somewhere...", 
                                                       "I definitely can see that love is in the air"]))
        elif 80 < shipnumber <= 90:
            status = "Over average! {}".format(random.choice(["Love is in the air!", 
                                                              "I can definitely feel the love", 
                                                              "I feel the love! There's a sign of a match!", 
                                                              "There's a sign of a match!", 
                                                              "I sense a match!", 
                                                              "A few things can be imporved to make this a match made in heaven!"]))
        elif 90 < shipnumber <= 100:
            status = "True love! {}".format(random.choice(["It's a match!", 
                                                           "There's a match made in heaven!", 
                                                           "It's definitely a match!", 
                                                           "Love is truely in the air!", 
                                                           "Love is most definitely in the air!"]))

        if shipnumber <= 33:
            shipColor = 0xE80303
        elif 33 < shipnumber < 66:
            shipColor = 0xff6600
        else:
            shipColor = 0x3be801

        emb = (discord.Embed(color=shipColor, \
                             title="Love test for:", \
                             description="**{0}** and **{1}** {2}".format(name1, name2, random.choice([
                                                                                                        ":sparkling_heart:", 
                                                                                                        ":heart_decoration:", 
                                                                                                        ":heart_exclamation:", 
                                                                                                        ":heartbeat:", 
                                                                                                        ":heartpulse:", 
                                                                                                        ":hearts:", 
                                                                                                        ":blue_heart:", 
                                                                                                        ":green_heart:", 
                                                                                                        ":purple_heart:", 
                                                                                                        ":revolving_hearts:", 
                                                                                                        ":yellow_heart:", 
                                                                                                        ":two_hearts:"]))))
        emb.add_field(name="Results:", value=f"{shipnumber}%", inline=True)
        emb.add_field(name="Status:", value=(status), inline=False)
        emb.set_author(name="Shipping", icon_url="http://moziru.com/images/kopel-clipart-heart-6.png")
        await ctx.send(embed=emb)

with open("config.json") as f:
    config = json.load(f)

@bot.command(aliases=['qrcode'])
async def qr(ctx, *, data):
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=2,
        )
        qr.add_data(data)
        img = qr.make_image(fill_color="white", back_color="black")
        img.save("images/QR.png")
        await ctx.send(f"{ctx.author.mention}", file=discord.File("images/QR.png"))
        os.remove("images/QR.png")






@bot.command(pass_context=True, aliases=['bigemoji/'])
async def bigemote(ctx, emoji):
        """Make a certain emote bigger"""
        try:
            if emoji[0] == '<':
                name = emoji.split(':')[1]
                emoji_name = emoji.split(':')[2][:-1]
                anim = emoji.split(':')[0]
                if anim == '<a':
                    url = f'https://cdn.discordapp.com/emojis/{emoji_name}.gif'
                else:
                    url = f'https://cdn.discordapp.com/emojis/{emoji_name}.png'
                try:
                    await ctx.send(url)
                except Exception as e:
                    print(e)
                    async with self.session.get(url) as resp:
                        if resp.status != 200:
                            await ctx.send('```Error: Emote not found.```')
                            return
                        img = await resp.read()

                    kwargs = {'parent_width': 1024, 'parent_height': 1024}
                    convert = False
                    task = functools.partial(bigEmote.generate, img, convert, **kwargs)
                    task = self.bot.loop.run_in_executor(None, task)
                    try:
                        img = await asyncio.wait_for(task, timeout=15)
                    except asyncio.TimeoutError:
                        await ctx.send("```Error: Timed Out. Try again in a few seconds")
                        return
                    await ctx.send(file=discord.File(img, filename=name + '.png'))
            
        except Exception as e:
            await ctx.send(f"```Error, couldn't send emote. Please tell my bot master\n{e}```")


  










@bot.command(no_pm=True)
async def currentgames(ctx):
        """Shows the most played games right now"""
        guild = ctx.message.guild
        members = guild.members

        freq_list = {}
        for member in members:
            if not member:
                continue
            if not member.activity or not member.activity.name:
                continue
            if member.bot:
                continue
            if member.activity.name not in freq_list:
                freq_list[member.activity.name] = 0
            freq_list[member.activity.name] += 1

        sorted_list = sorted(freq_list.items(),
                             key=operator.itemgetter(1),
                             reverse=True)

        if not freq_list:
            await ctx.send("```Search results:\nNo users are currently playing any games. Odd...```")
        else:
            # Create display and embed
            msg = ""
            max_games = min(len(sorted_list), 10)

            em = discord.Embed(description=msg, colour=discord.Colour(value=0x36393e))
            for i in range(max_games):
                game, freq = sorted_list[i]
                if int(freq_list[game]) < 2:
                    amount = "1 person"
                else:
                    amount = f"{int(freq_list[game])} people"
                em.add_field(name=game, value=amount,inline=False)
            em.set_thumbnail(url=guild.icon_url)
            em.set_footer(text="Do $whosplaying <game> to see whos playing a specific game")
            em.set_author(name="Top games being played right now in the server:", icon_url=config["styling"]["gifLogo"])
            await ctx.send(embed=em)


@bot.command(no_pm=True)
async def whosplaying(ctx, *, game):
        """Shows who's playing a specific game"""
        if len(game) <= 1:
            await ctx.send("```The game should be at least 2 characters long...```", delete_after=5.0)
            return

        guild = ctx.message.guild
        members = guild.members
        playing_game = ""
        count_playing = 0

        for member in members:
            if not member:
                continue
            if not member.activity or not member.activity.name:
                continue
            if member.bot:
                continue
            if game.lower() in member.activity.name.lower():
                count_playing += 1
                if count_playing <= 15:
                    emote = random.choice([":trident:", ":high_brightness:", ":low_brightness:", ":beginner:", ":diamond_shape_with_a_dot_inside:"])
                    playing_game += f"{emote} {member.name} ({member.activity.name})\n"

        if playing_game == "":
            await ctx.send("```Search results:\nNo users are currently playing that game.```")
        else:
            msg = playing_game
            if count_playing > 15:
                showing = "(Showing 15/{})".format(count_playing)       
            else:
                showing = "({})".format(count_playing)

            em = discord.Embed(description=msg, colour=discord.Colour(value=0x36393e))
            em.set_author(name=f"""Who's playing "{game}"? {showing}""", icon_url=config["styling"]["gifLogo"])
            await ctx.send(embed=em)

@bot.command()
async def combine(ctx, name1: clean_content, name2: clean_content):
        name1letters = name1[:round(len(name1) / 2)]
        name2letters = name2[round(len(name2) / 2):]
        ship = "".join([name1letters, name2letters])
        emb = (discord.Embed(color=0x36393e, description = f"{ship}"))
        emb.set_author(name=f"{name1} + {name2}", icon_url=config["styling"]["gifLogo"])
        await ctx.send(embed=emb)

@bot.command()
async def ser(ctx):
  for guild in bot.guilds:
    activeservers =bot.guilds
    for guild in activeservers:
      gmember=guild.member_count
      gname=guild.name
      await ctx.send(f"{gname}: {gmember}")
      break
  

 


@bot.command(aliases = ["g"])
async def google(ctx, *, query):
  searchInput = "https://google.com/search?q=%22+urllib.parse.quote(query)"
  res = requests.get(searchInput)
  soup = bs4.BeautifulSoup(res.text, "html.parser")

  linkElements = soup.select('div#main > div > div > div > a')
  if len(linkElements) == 0:
    await ctx.send("Couldn't find any results...")
  else:
    link = linkElements(0).get("href")
    i = 0

  while link[0:4] != "/url" or link[14:20] == "google":
    i += 1
    link = linkElements[i].get("href")

  await ctx.send(":desktop: http://google.com/%22+link")

@bot.command(description="emojify your text")
async def emojify(ctx, *, text):
    emojis = []
    for s in text.lower():
        if s.isdecimal():
            num2emo = {'0':'zero', '1':'one', '2':'two', '3':'three', '4':'four', '5':'five', '6':'six', '7':'seven', '8':'eight', '9':'nine'}
            emojis.append(f":{num2emo.get(s)}:")

        elif s.isalpha():
            emojis.append(f":regional_indicator_{s}:")
        else:
            emojis.append(s)

    await ctx.send("".join(emojis))

import dateutil.parser

@bot.command()
async def test(ctx, user: discord.Member = None):
        user = user or ctx.author
        spotify_result = next((activity for activity in user.activities if isinstance(activity, discord.Spotify)), None)

        if spotify_result is None:
            await ctx.send(f'{user.name} is not listening to Spotify.')

        # Images
        track_background_image = Image.open('./images/spotify_template.png')
        album_image = Image.open(requests.get(spotify_result.album_cover_url, stream=True).raw).convert('RGBA')

        # Fonts
        title_font = ImageFont.truetype('theboldfont.ttf', 16)
        artist_font = ImageFont.truetype('theboldfont.ttf', 14)
        album_font = ImageFont.truetype('theboldfont.ttf', 14)
        start_duration_font = ImageFont.truetype('theboldfont.ttf', 12)
        end_duration_font = ImageFont.truetype('theboldfont.ttf', 12)

        # Positions
        title_text_position = 150, 30
        artist_text_position = 150, 60
        album_text_position = 150, 80
        start_duration_text_position = 150, 122
        end_duration_text_position = 515, 122

        # Draws
        draw_on_image = ImageDraw.Draw(track_background_image)
        draw_on_image.text(title_text_position, spotify_result.title, 'white', font=title_font)
        draw_on_image.text(artist_text_position, f'by {spotify_result.artist}', 'white', font=artist_font)
        draw_on_image.text(album_text_position, spotify_result.album, 'white', font=album_font)
        draw_on_image.text(start_duration_text_position, '0:00', 'white', font=start_duration_font)
        draw_on_image.text(end_duration_text_position,
                           f"{dateutil.parser.parse(str(spotify_result.duration)).strftime('%M:%S')}",
                           'white', font=end_duration_font)

        # Background colour
        album_color = album_image.getpixel((250, 100))
        background_image_color = Image.new('RGBA', track_background_image.size, album_color)
        background_image_color.paste(track_background_image, (0, 0), track_background_image)

        # Resize
        album_image_resize = album_image.resize((140, 160))
        background_image_color.paste(album_image_resize, (0, 0), album_image_resize)

        # Save image
        background_image_color.convert('RGB').save('spotify.jpg', 'JPEG')

        await ctx.send(file=discord.File('spotify.jpg'))




@bot.command() 
async def rpss(ctx): 
    msg = await ctx.send("🧱📰✂...")

    # adding reactions
    await msg.add_reaction("🧱")
    await msg.add_reaction("📰")
    await msg.add_reaction("✂")

    bot_choice = random.randint(1, 3) 

    # this is the check and wait_for
    def check(reaction, user):
        return user == ctx.author and str(reaction) in ["🧱", "📰", "✂"] and reaction.message == msg

    reaction, user = await bot.wait_for("reaction_add", check=check) 
    
    if str(reaction.emoji) == "🧱":
        if bot_choice == 1: 
            await ctx.send('I pick Rock, we tie!')
        if bot_choice == 2: 
            await ctx.send('I pick Paper, I win!')
        if bot_choice == 3: 
           await ctx.send('I pick Scissors, I lose')
    if str(reaction.emoji) == "📰":
        if bot_choice == 1: 
            await ctx.send('I pick Paper, we tie!')
        if bot_choice == 2: 
            await ctx.send('I pick Rock, I lose!')
        if bot_choice == 3:
           await ctx.send('I pick Scissors, I won')
    if str(reaction.emoji) == "✂":
        if bot_choice == 1:
            await ctx.send('I pick Scissors, we tie!')
        if bot_choice == 2:
            await ctx.send('I pick Rock, I win!')
        if bot_choice == 3:
           await ctx.send('I pick Paper, I lose')       








from aiohttp import request


@bot.command()
@commands.cooldown(1, 60, BucketType.user)
async def animal_fact(self, ctx, animal: str):
		if (animal := animal.lower()) in ("dog", "cat", "panda", "fox", "bird", "koala"):
			fact_url = f"https://some-random-api.ml/facts/{animal}"
			image_url = f"https://some-random-api.ml/img/{'birb' if animal == 'bird' else animal}"

			async with request("GET", image_url, headers={}) as response:
				if response.status == 200:
					data = await response.json()
					image_link = data["link"]

				else:
					image_link = None

			async with request("GET", fact_url, headers={}) as response:
				if response.status == 200:
					data = await response.json()

					embed = Embed(title=f"{animal.title()} fact",
								  description=data["fact"],
								  colour=ctx.author.colour)
					if image_link is not None:
						embed.set_image(url=image_link)
					await ctx.send(embed=embed)

				else:
					await ctx.send(f"API returned a {response.status} status.")

		else:
			await ctx.send("No facts are available for that animal.")

     

			
    
@animal_fact.error
async def animal_error(ctx, error):
        if isinstance(error, commands.CommandOnCooldown):
            em = discord.Embed(title=f"Slow it down bro!",description=f"Try again in {error.retry_after:.2f}s.", color=discord.Color.red())
            await ctx.send(embed=em)








@bot.command()
async def adduser(ctx, member: discord.Member = None):
  member = ctx.author
  async with aiosqlite.connect("main.db") as db:
      async with db.cursor() as cursor:
        await cursor.execute('SELECT id FROM users WHERE guild = ?',(ctx.guild.id,))
        data = await cursor.fetchone()
        if data:
          await cursor.execute('UPDATE users SET id = ? WHERE guild = ?', (member.id, ctx.guild.id,))
        else:
          await cursor.execute('INSERT INTO users (id, guild) VALUES (?, ?)', (member.id, ctx.guild.id,))
      await db.commit()

@bot.command()
async def removeuser(ctx, member: discord.Member = None):
  member = ctx.author
  async with aiosqlite.connect("main.db") as db:
      async with db.cursor() as cursor:
        await cursor.execute('SELECT id FROM users WHERE guild = ?',(ctx.guild.id,))
        data = await cursor.fetchone()
        if data:
          await cursor.execute('UPDATE prefix SET prefix = ? WHERE guild = ?', (prefix, ctx.guild.id,))
          await ctx.send("upda")
        else:
          await cursor.execute('INSERT INTO users (id, guild) VALUES (?, ?)', (member.id, ctx.guild.id,))
        
      await db.commit()

@bot.event
async def on_guild_join(guild):
  async with aiosqlite.connect("prefixes.db") as db:
      async with db.cursor() as cursor:
        await cursor.execute('INSERT INTO prefix (prefix, guild) VALUES (?, ?)', ('$', guild.id,))
      await db.commit()  

@bot.event
async def on_guild_remove(guild):
  async with aiosqlite.connect("prefixes.db") as db:
      async with db.cursor() as cursor:
        await cursor.execute('SELECT prefix FROM prefix WHERE guild = ?',(guild.id,))
        data = await cursor.fetchone()
        if data:
          await cursor.execute('DELETE FROM prefix WHERE prefix WHERE guild = ?',(guild.id,))
      await db.commit()  


@bot.command(aliases=["sp"])
@has_permissions(administrator=True)
async def setprefix(ctx, prefix=None):
  if prefix == None:
    return
  async with aiosqlite.connect("prefixes.db") as db:
      async with db.cursor() as cursor:
        await cursor.execute('SELECT prefix FROM prefix WHERE guild = ?',(ctx.guild.id,))
        data = await cursor.fetchone()
        if data:
          await cursor.execute('UPDATE prefix SET prefix = ? WHERE guild = ?', (prefix, ctx.guild.id,))
          await ctx.send(f"Updated prefix to {prefix}")
        else:
          await cursor.execute('INSERT INTO prefix (prefix, guild) VALUES (?, ?)', ('$', ctx.guild.id,))
          await cursor.execute('SELECT prefix FROM prefix WHERE guild = ?',(ctx.guild.id,))
          data = await cursor.fetchone()
          if data:
            await cursor.execute('UPDATE prefix SET prefix = ? WHERE guild = ?', (prefix, ctx.guild.id,))
            await ctx.send(f"Updated prefix to {prefix}")
          else:
            return
      await db.commit()  
    


 
 
async def bump_reminder(ctx: discord.ext.commands.Context, action: str):
    disboard=ctx.guild.get_member(302050872383242240)
    if ctx.channel.id!=757807944762130472:
        await ctx.send("Use this command at the bump channel")
        return
    if not action.casefold() == "bump":
        return
    if not disboard.status == discord.Status.online:
        await ctx.send(embed=(discord.Embed(color=discord.Colour.red,description=(f"{disboard.mention} appears to be offline right now!\nI'll monitor the bump bot's status and notify everyone when it comes back online."))))
        return
    else:
        await ctx.send("thanks for bumping, disboard will be back in two hours to be bumped:)")
        await ctx.channel.set_permissions(disboard, view_channel =False)
        lock_disboard_Out_for_two_hours.start()
        return

@tasks.loop()
async def lock_disboard_Out_for_two_hours():
    if lock_disboard_Out_for_two_hours.current_loop == 0:
        return None
    guild =bot.get_guild(751683524171530331)
    disband_role=discord.utils.get(guild.roles, name="DISBOARD.org")
    bump_role=discord.utils.get(guild.roles, name="Bumpers")
    channel=guild.get_channel(931598843454316584)
    await channel.set_permissions(disband_role, view_channel = True)
    await channel.send(f"Discord is back, {bump_role.mention} come bump the server!")
    lock_disboard_Out_for_two_hours.cancel()

import disputils
from disputils import BotEmbedPaginator, BotConfirmation, BotMultipleChoice






@bot.command()
async def paginate(ctx):
    embed1 = discord.Embed(color=ctx.author.color).add_field(name="Example", value="Page 1")
    embed1.set_thumbnail(url="https://cdn.discordapp.com/attachments/874027599947501600/891918754995392512/image0.jpg")
    embed1.set_footer(icon_url = "https://cdn.discordapp.com/avatars/756715507306201130/f649d32cf02ebc5dbc821ba13972cba6.webp?size=1024",text = "Captain Hook")
    embed2 = discord.Embed(color=ctx.author.color).add_field(name="Example", value="Page 2")
    embed3 = discord.Embed(color=ctx.author.color).add_field(name="Example", value="Page 3")
    paginator = DiscordUtils.Pagination.CustomEmbedPaginator(ctx)
    paginator.add_reaction('⏮️', "first")
    paginator.add_reaction('⏪', "back")
    paginator.add_reaction('⏩', "next")
    paginator.add_reaction('⏭️', "last")
    embeds = [embed1, embed2, embed3]
    await paginator.run(embeds)


bot.remove_command("help")
@bot.group(invoke_without_command=True)
async def help(ctx):
  async with aiosqlite.connect("prefixes.db") as db:
      async with db.cursor() as cursor:
        await cursor.execute('SELECT prefix FROM prefix WHERE guild = ?',(ctx.guild.id,))
        data = await cursor.fetchone()
  em = discord.Embed(title = "Captain Hook's available commands", description = f"<:red:916983573007978506> Prefix: \n> **My Default Prefix:** `$`\n\n<:red:916983573007978506> Command Usage:\n> **Use $help <command> for extended help!**",color=ctx.author.color,timestamp=ctx.message.created_at)
  em.set_author(name=ctx.author.name, icon_url=ctx.author.avatar_url)
  em.set_thumbnail(url=ctx.author.avatar_url)
  em.set_image(url="https://share.creavite.co/JLOI7k5D1LX3HPJc.gif")
  


  em.add_field(name = "<:red:916983573007978506> Available categories:",value=">>> <a:doggosmack:916983601147576327> `$help mod`\n <a:danklaugh:916983638581731328> `$help fun`\n<:waku_game:916983580721303572> `$help games`\n<:calc:916983558491471892> `$help Calculator`\n<a:music:916983609662009346> `$help Music`\n<:info:916983567911899146> `$help Info`\n<a:bitcoin_:916983636576829522> `$help Economy`\n:frame_photo: `$help image`\n :cd: `$help Misc`\n<:gear3:916983566104154132> `$help Utility`\n<a:rikka_spin:925382098422988861> `$help Anime`\n Note: dev is making some changes. so you will see some help's sub command updated! ",inline=False)
  
  await ctx.send(embed = em)


  
        

@help.command(aliases=['Mod'])
async def mod(ctx):

  em = discord.Embed(title = "Moderation commands list:", description = "`poll`| `setdelay`| `lock`| `unlock` ",color=discord.Color.blue(),timestamp=ctx.message.created_at)
  em.add_field(name = "UseFul links:", value = "[website!]( https://captain-hook-bot.vercel.app/) | [Invite me!](https://discord.com/api/oauth2/authorize?client_id=756715507306201130&permissions=8&scope=bot)")
  em.set_thumbnail(url="https://cdn.discordapp.com/avatars/756715507306201130/f649d32cf02ebc5dbc821ba13972cba6.webp?size=1024")
  em.set_footer(icon_url = "https://cdn.discordapp.com/avatars/756715507306201130/f649d32cf02ebc5dbc821ba13972cba6.webp?size=1024",text = "Captain Hook")

  
  await ctx.send(embed = em)

@help.command(aliases=['test'])
async def test4(ctx):

    e = Embed(title="Fun commands list:", description=">>> Fun commands this is why i made the bot for making ppl laugh. \n", color=0x115599).set_footer(text=f"{ctx.author.name} | Pages",icon_url=f"{ctx.author.avatar_url}").set_thumbnail(url="https://uctlanguagecentre.com/wp-content/uploads/2016/10/6sided_dice.jpg")
    e.add_field(name="tea",value="```$tea <mention> - Want to drink some virtual tea? oh, nice! use this command and drink tea with your friends!```")
    e.add_field(name="Reverse",value="```reverses the sentence```",inline=False)
    e.add_field(name="Say",value="```make the bot say something  ex - $say im good bot```",inline=False)
    e.add_field(name="Kill",value="```Kill someone by using this command! (not real one tho) ```",inline=False)
    e.add_field(name="Rate",value="```Rates someone by mentioning or by typing their name!```",inline=False)
    
    embeds = [
        e,
        Embed(title="Fun Commands List:", description=">>> Fun Commands to make you laugh  \n ", color=0x5599ff).set_thumbnail(url="https://uctlanguagecentre.com/wp-content/uploads/2016/10/6sided_dice.jpg").set_footer(text=f"{ctx.author.name} | Pages",icon_url=f"{ctx.author.avatar_url}").add_field(name="hotcalc",value="```$hotcalc <mention> - Same as rate cmd, just shows how hot are you!```",inline=False).add_field(name="$error",value="```$error <mention> - sends a error pic. find out how it works by trying it ;)```",inline=False).add_field(name="cancel",value="```$cancel <mention> - sends a twitter #cancel pic, but you are mentioned init :)```",inline=False).add_field(name="meme",value="```$meme - sends a random meme.```",inline=False).add_field(name="reddit",value="```$reddit - sends a random meme from reddit.```",inline=False).add_field(name="sus",value="```$sus <mention> - eject the mentioned member!```",inline=False),
        Embed(title="Fun Commands List:",description=">>> Fun Commands to make you laugh  \n ", color=0x5599ff).set_footer(text=f"{ctx.author.name} | Pages",icon_url=f"{ctx.author.avatar_url}").add_field(name="Ranick",value="```$ranick gives you a random nickname you never know whats coming ;)```",inline=False).add_field(name="Yomoma",value="```$yomoma <mention> jokes about yomoma be sure to see whom you are roasting! it can be dangerous.```",inline=False).add_field(name="Loverate",value="```$loverate <mention or content> <mention2 or content2 check your loverate ;)```",inline=False),
        Embed(title="Useful links", description=">>> Some useful links might help you know more about the bot! \n ", color=0x5599ff).set_thumbnail(url="https://www.tenterdentowncouncil.gov.uk/image/links1.jpg").add_field(name = "links:", value = "[website!]( https://captain-hook-bot.vercel.app/) | [Invite me!](https://discord.com/api/oauth2/authorize?client_id=756715507306201130&permissions=8&scope=bot)",inline=False).set_footer(icon_url = f"{ctx.author.avatar_url}",text = f"{ctx.author.name} | Pages").add_field(name="Website links! :link:", value="[website!](https://captain-hook-bot.vercel.app/) | [My top.gg page!](https://top.gg/bot/756715507306201130)").add_field(name="Invite Hook :link:", value="[Invite me!](https://discord.com/api/oauth2/authorize?client_id=756715507306201130&permissions=8&scope=bot)",inline=False).add_field(name="Other links :link:", value="[Support Server!](https://discord.gg/GQpAfdkEFs)",inline=False)
  
  
        
    ]
    paginator = BotEmbedPaginator(ctx, embeds)
    await paginator.run()

@help.command(aliases=['Fun'])
async def fun(ctx):

  em = discord.Embed(title = "Fun commands list:", description = "`question`| `reverse`| `meme`| `say`| `kill`| `tt`| `reversed`| `rate`| `hotcalc`| `dm <member>`| `error @mention`| `cancel @mention| text <your text here>`| `sus`| `randomsus`| `tts`| `ranick`| `yomoma`| `loverate`",color=discord.Color.blue(),timestamp=ctx.message.created_at)
  em.add_field(name = "UseFul links:", value = "[website!]( https://captain-hook-bot.vercel.app/) | [Invite me!](https://discord.com/api/oauth2/authorize?client_id=756715507306201130&permissions=8&scope=bot)")
  em.set_thumbnail(url="https://cdn.discordapp.com/avatars/756715507306201130/f649d32cf02ebc5dbc821ba13972cba6.webp?size=1024")
  em.set_footer(icon_url = "https://cdn.discordapp.com/avatars/756715507306201130/f649d32cf02ebc5dbc821ba13972cba6.webp?size=1024",text = "Captain Hook")

  
  await ctx.send(embed = em)

@help.command(aliases=['Games'])
async def games(ctx):

    e = Embed(title="Games Commands List:", description=">>> Games commands. we have some great multiplayer and single player commands! check them all. \n", color=0x115599).set_footer(text=f"{ctx.author.name} | Pages",icon_url=f"{ctx.author.avatar_url}").set_thumbnail(url="https://uctlanguagecentre.com/wp-content/uploads/2016/10/6sided_dice.jpg")
    e.add_field(name="Eightball",value="```Ask a 8ball question to the bot!```")
    e.add_field(name="Dice",value="```roll a dice```",inline=False)
    e.add_field(name="Coinflip",value="```flip a coin heads or tails!```",inline=False)
    e.add_field(name="Roll",value="```Roll a random number between 1-100```",inline=False)
    e.add_field(name="Slot",value="```play a slot game!```",inline=False)
    
    embeds = [
        e,
        Embed(title="Games Commands List:", description=">>> Games commands. we have some great multiplayer and single player commands! check them all. \n ", color=0x5599ff).set_thumbnail(url="https://uctlanguagecentre.com/wp-content/uploads/2016/10/6sided_dice.jpg").set_footer(text=f"{ctx.author.name} | Pages",icon_url=f"{ctx.author.avatar_url}").add_field(name="Findimposter",value="```A unique game made by me! find who is imposter.```",inline=False).add_field(name="Tictactoe",value="```Play a tictactoe game with your friends!```",inline=False).add_field(name="Findimposter",value="```A unique game made by me! find who is the imposter!```",inline=False).add_field(name="End",value="```to end a tictactoe game use this command.```",inline=False).add_field(name="Place",value="```place your x or o mark in the tictactoe board!```",inline=False),
        Embed(title="Useful links", description=">>> Some useful links might help you know more about the bot! \n ", color=0x5599ff).set_thumbnail(url="https://www.tenterdentowncouncil.gov.uk/image/links1.jpg").add_field(name = "links:", value = "[website!]( https://captain-hook-bot.vercel.app/) | [Invite me!](https://discord.com/api/oauth2/authorize?client_id=756715507306201130&permissions=8&scope=bot)",inline=False).set_footer(icon_url = f"{ctx.author.avatar_url}",text = f"{ctx.author.name} | Pages").add_field(name="Website links! :link:", value="[website!](https://captain-hook-bot.vercel.app/) | [My top.gg page!](https://top.gg/bot/756715507306201130)").add_field(name="Invite Hook :link:", value="[Invite me!](https://discord.com/api/oauth2/authorize?client_id=756715507306201130&permissions=8&scope=bot)",inline=False).add_field(name="Other links :link:", value="[Support Server!](https://discord.gg/GQpAfdkEFs)",inline=False)
  
  
        
    ]
    paginator = BotEmbedPaginator(ctx, embeds)
    await paginator.run()


@help.command(aliases=['Calc,calc,calculator'])
async def Calculator(ctx):

  em = discord.Embed(title = "Calculator commands list:", description = "`mathadd`| `mathsub`| `mathdiv`| `mathmult`",color=discord.Color.blue(),timestamp=ctx.message.created_at)
  em.add_field(name = "UseFul links:", value = "[website!]( https://captain-hook-bot.vercel.app/) | [Invite me!](https://discord.com/api/oauth2/authorize?client_id=756715507306201130&permissions=8&scope=bot)")
  em.set_thumbnail(url="https://cdn.discordapp.com/avatars/756715507306201130/f649d32cf02ebc5dbc821ba13972cba6.webp?size=1024")
  em.set_footer(icon_url = "https://cdn.discordapp.com/avatars/756715507306201130/f649d32cf02ebc5dbc821ba13972cba6.webp?size=1024",text = "Captain Hook")

  
  await ctx.send(embed = em)
 
@help.command(aliases=['music'])
async def Music(ctx):
  em = discord.Embed(title = "Music commands list:", description = "Sorry guys! due to some problem with music library, i'm removing music commands for a while my apologies.",color=discord.Color.blue(),
  timestamp=ctx.message.created_at)
  em.add_field(name = "SoundBoard commands list:", value = "`horn`| `rickroll`| `avocados`| `cat`| `more sound boards are coming soon!`")
  em.add_field(name = "UseFul links:", value = "[website!]( https://captain-hook-bot.vercel.app/) | [Invite me!](https://discord.com/api/oauth2/authorize?client_id=756715507306201130&permissions=8&scope=bot)",inline=False)
  em.set_thumbnail(url="https://cdn.discordapp.com/avatars/756715507306201130/f649d32cf02ebc5dbc821ba13972cba6.webp?size=1024")
  em.set_footer(icon_url = "https://cdn.discordapp.com/avatars/756715507306201130/f649d32cf02ebc5dbc821ba13972cba6.webp?size=1024",text = "Captain Hook")
  
  await ctx.send(embed = em)
               
@help.command(aliases=['Info'])
async def info(ctx):
  em = discord.Embed(title = "Info command list:", description = "`avatar <@mention>`| `serverinfo`| `snipe`| `server`| `banner`| `useri`| `owner`",color=0xffd700)
  em.add_field(name = "UseFul links:", value = "[website!]( https://captain-hook-bot.vercel.app/) | [Invite me!](https://discord.com/api/oauth2/authorize?client_id=756715507306201130&permissions=8&scope=bot)")
  em.set_thumbnail(url="https://cdn.discordapp.com/avatars/756715507306201130/f649d32cf02ebc5dbc821ba13972cba6.webp?size=1024")
  em.set_footer(icon_url = "https://cdn.discordapp.com/avatars/756715507306201130/f649d32cf02ebc5dbc821ba13972cba6.webp?size=1024",text = "Captain Hook")

  
  await ctx.send(embed = em)

@help.command(aliases=['economy'])
async def Ecomony(ctx):

  em = discord.Embed(title = "Economy commands list: (economy commands are having some coding error dev is fixing them!", description = "`balance`| `beg`| `withdraw`| `deposit`| `gamble`| `work`",color=0xffd700)
  em.add_field(name = "UseFul links:", value = "[website!]( https://captain-hook-bot.vercel.app/) | [Invite me!](https://discord.com/api/oauth2/authorize?client_id=756715507306201130&permissions=8&scope=bot)")
  em.set_thumbnail(url="https://cdn.discordapp.com/avatars/756715507306201130/f649d32cf02ebc5dbc821ba13972cba6.webp?size=1024")
  em.set_footer(icon_url = "https://cdn.discordapp.com/avatars/756715507306201130/f649d32cf02ebc5dbc821ba13972cba6.webp?size=1024",text = "Captain Hook")

  
  await ctx.send(embed = em)  

@help.command(aliases=['utility'])
async def Utility(ctx):

  em = discord.Embed(title = "Utility commands list:", description = f"`uptime`| `invite`| `ping`| `password`| `createemoji <emoji link> <emoji name>`| `deleteemoji <emoji name>`| `emoji <emoji here> <emoji name here>`| `sp <your prefix here> set a custom prefix`| `bug`| `remind ex - 1h classes`| `timer ex- 1m`` ",color=0xffd700)
  em.add_field(name = "UseFul links:", value = "[website!]( https://captain-hook-bot.vercel.app/) | [Invite me!](https://discord.com/api/oauth2/authorize?client_id=756715507306201130&permissions=8&scope=bot)")
  em.set_thumbnail(url="https://cdn.discordapp.com/avatars/756715507306201130/f649d32cf02ebc5dbc821ba13972cba6.webp?size=1024")
  em.set_footer(icon_url = "https://cdn.discordapp.com/avatars/756715507306201130/f649d32cf02ebc5dbc821ba13972cba6.webp?size=1024",text = "Captain Hook")

  
  await ctx.send(embed = em)

@help.command(aliases=['misc'])
async def Misc(ctx):

  em = discord.Embed(title = "Misc commands list:", description = "`catfact`, `fact`,`dog`,`uselessfact`,",color=0xffd700)
  em.add_field(name = "UseFul links:", value = "[website!]( https://captain-hook-bot.vercel.app/) | [Invite me!](https://discord.com/api/oauth2/authorize?client_id=756715507306201130&permissions=8&scope=bot)")
  em.set_thumbnail(url="https://cdn.discordapp.com/avatars/756715507306201130/f649d32cf02ebc5dbc821ba13972cba6.webp?size=1024")
  em.set_footer(icon_url = "https://cdn.discordapp.com/avatars/756715507306201130/f649d32cf02ebc5dbc821ba13972cba6.webp?size=1024",text = "Captain Hook") 

  
  await ctx.send(embed = em)   

@help.command(aliases=['anime'])
async def Anime(ctx):
  em = discord.Embed(title = "Anime commands list:", description = "`mal`|`anime`|`hug <@mention>`|`slap <@mention>|` `blush`| `wink`| `cuddly <@mention>|` `highfive <@mention`| `smug`| `anime <anime name>`| `char <anime character name>`| `aninews`   ",color=0xffd700)
  em.add_field(name = "UseFul links:", value = "[website!]( https://captain-hook-bot.vercel.app/) | [Invite me!]()")
  em.set_thumbnail(url="https://cdn.discordapp.com/avatars/756715507306201130/f649d32cf02ebc5dbc821ba13972cba6.webp?size=1024")
  em.set_footer(icon_url = "https://cdn.discordapp.com/avatars/756715507306201130/f649d32cf02ebc5dbc821ba13972cba6.webp?size=1024",text = "Captain Hook") 
  await ctx.send(embed = em)   


@bot.event
async def on_ready():
    print('Connected to bot: {}'.format(bot.user.name))
    print('Bot ID: {}'.format(bot.user.id))
    channel = bot.get_channel(916966063529406464)
    await channel.send(f" I'm online now! time to rock. My current ping is {round(bot.latency * 1000)}ms")            
    async with aiosqlite.connect("prefixes.db") as db:
      async with db.cursor() as cursor:
        await cursor.execute('CREATE TABLE IF NOT EXISTS prefix (prefix TEXT, guild ID)')
      await db.commit()
    db = sqlite3.connect('main.sqlite')
    cursor = db.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS main(
          guild_id TEXT,
          msg TEXT,
          channel_id TEXT
        )
        ''')
    db = sqlite3.connect('main.sqlite')
    cursor = db.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS leave(
          guild_id TEXT,
          msg TEXT,
          channel_id TEXT
        )
        ''')
    db = sqlite3.connect('auto.sqlite')
    cursor = db.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS auto(
          guild_id TEXT,
          word TEXT
        )
        ''')       
        

      

  

    servers = len(bot.guilds)
    members = 0
    for guild in bot.guilds:
        members += guild.member_count - 1

    await bot.change_presence(activity = discord.Activity(
        type = discord.ActivityType.watching,
        name = f'{servers} servers and {members} members'

    ))
    





async def web_scrape(text):
  async with aiohttp.ClientSession() as session:
    async with session.get(text) as r:
      status = r.status
      if status == 200:
        text= await r.text()
      return text




@bot.command(aliases=['wyr'])
async def would_you_rather(ctx):
  text = await web_scrape("https://either.io/")
  soup = BeautifulSoup(text,'lxml')
  l = []
  for choice in soup.find_all("span",{"class":"option-text"}):
    l.append(choice.text)
  e = discord.Embed(color=discord.Color.random())
  e.set_author(name="Would you rather...",url="https://either.io/",icon_url=bot.user.avatar_url)
  e.add_field(name="Either...",value=f":regional_indicator_a: {l[0]}",inline=False)
  e.add_field(name="Or...",value=f":regional_indicator_b: {l[1]}",inline=False)
  e.add_field(name="Neither..",value=f":regional_indicator_c: This option for those ppl, who can't decide what to choose. ",inline=False)
  msg = await ctx.send(embed=e)
  await msg.add_reaction("🇦")
  await msg.add_reaction("🇧")
  await msg.add_reaction("🇨")



















app.run(port=5000)
token = os.environ.get("DISCORD_TOKEN")
bot.run(token)










       
        


