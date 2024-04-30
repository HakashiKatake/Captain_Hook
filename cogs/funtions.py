import discord
from discord.ext import commands
import json
import requests
from PIL import Image
from PIL import Image,ImageFont,ImageDraw,ImageFilter
from io import BytesIO 
from discord.ext.commands.core import command
import itertools
from discord.utils import get
from afks import afks



from converters import ImageFinder

def remove(afk):
    if "(AFK)" in afk.split():
        return " ".join(afk.split()[1:])
    else:
        return afk

class funtions(commands.Cog):
    def __init__(self, bot):
      self.bot = bot



               

    @commands.Cog.listener()
    async def on_message(self,message):
        if message.author.id in afks.keys():
            afks.pop(message.author.id)
            try:
                await message.author.edit(nick = remove(message.author.display_name))
            except:
                pass
            await message.channel.send(f'Welcome back {message.author.name}, I removed you AFK')

        for id, reason in afks.items():
            member = get(message.guild.members, id = id)
            if (message.reference and member == (await message.channel.fetch_message(message.reference.message_id)).author) or member.id in message.raw_mentions:
                embed = discord.Embed(title=f"{member.name} is AFK :zzz: ",description=f"Afk note: **{reason}**",color=discord.Color.random())
                await message.reply(embed=embed)


         
                  

    @commands.command(name='21dares', aliases= ['truth_or_dare'])
    async def tod(self, ctx, user: discord.Member = None):
        '''21 truth or dare game'''
        the_author = ctx.author
        channel = ctx.channel
        if user is None:
            embed = discord.Embed(title="Truth or Dare game", color=discord.Colour.orange(),
                                  description=f"{the_author.mention} is inviting anyone to play truth or dare! \n\nType `accept` now to accept the challenge and begin a game with them.")
        elif user != the_author and not user.bot:
            embed = discord.Embed(title=" truth or dare", color=discord.Colour.orange(),
                                  description=f"{the_author.mention} is inviting anyone to play truth or dare! \n\nType `accept` now to accept the challenge and begin a game with them.")
        else:
            embed = discord.Embed(title="You can't invite yourself or a discord bot to a game!")
        
        msg = await channel.send(embed=embed)

        
        playerlist = []
        check_list = []
        count_list = []
        current_count = 0

        def checkConsecutive(l):
            return sorted(l) == list(range(min(l), max(l)+1))

        def check(message):
            return True
        
        while True:
            msg = await self.bot.wait_for('message', timeout=60.0, check=check)
            if msg.content == 'accept':
                await ctx.send(f'{msg.author.mention} accepted! type `start` before 60 seconds to start')
                playerlist.append(msg.author)

            elif msg.content == 'start' and len(playerlist)>=2:
                await ctx.send(f'Game started!Start by typing `1 2 ..`')
                
                for player in itertools.cycle(playerlist):
                    embedlost = discord.Embed(title=f"{player} lost! choose `Truth or Dare?!`")
                    await ctx.send(f"{player.mention}'s turn!")
                    def check1(message):
                        if message.author == player:

                            return True
                    n = await self.bot.wait_for('message', timeout=60.0, check=check1)
                    if n.content == 'cancel' or n.content =='stop': break
                    if n.author == player and n.author != self.bot.user:
                        listn = n.content.split(' ')
                        for element in listn:
                            element = int(element)
                            check_list.append(element)

                        if current_count >= 21:
                            
                            await ctx.send(embed= embedlost)

                            break
                        elif check_list[0] == current_count+1:
                            if checkConsecutive(check_list)==True:
                                for element in check_list : count_list.append(element)
                                current_count = count_list[-1]
                                check_list.clear()
                                await n.add_reaction('✅')
                            else :
                                await ctx.send('Numbers not consecutive! YOU SPOLIED THE GAME! YOU LOSE!')
                                await ctx.send(embed=embedlost)
                                check_list.clear()
                                break
                        else:
                            await ctx.send(f'Dude you have to start from {current_count+1}! YOU SPOLIED THE GAME! YOU LOSE!')
                            await ctx.send(embed=embed)
            
            elif msg.content == 'start' and len(playerlist)==0 or len(playerlist)==1:
                await ctx.send("Can't start, less than 2 players")    
            elif msg.content == 'cancel':
                await ctx.send('Game Cancelled')
                break
    
    @commands.command()
    async def afk(self,ctx,*,reason ="No reason provided"):
        """Go AFK (away from keyboard) for some time being"""
        member = ctx.author
        if member.id in afks.keys():
            afks.pop(member.id)
        else:
            try:
                await member.edit(nick = f"(AFK) {member.display_name}")
            except:
                pass
        afks[member.id] = reason
        embed = discord.Embed(title = ":zzz: Member AFK", description = f"{member.mention} has gone AFK",color = member.color)
        embed.set_thumbnail(url = member.avatar_url)
        embed.set_author(name=self.bot.user.name, icon_url=self.bot.user.avatar_url)
        embed.add_field(name='AFK note: ',value=reason)
        await ctx.send(embed=embed)

    
    
     
     
       

def setup(bot):
    bot.add_cog(funtions(bot))