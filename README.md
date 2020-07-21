# Wonton Bot

Version 1.69.0

Prerequisites: Node.js (and npm)

## Description

General use Discord bot that reads and responds to commands.

### Command list (also in help.txt)

Auto commands (no prefix):

Can I get a rip in the chat : rip
Press f to pay respects : F
gn : good night
gm : good morning

Commands:

help - Recursive joke here
define - Search Merriam-Webster Dictionary
udefine - Search Urban Dictionary
timer - Format is "[days]:[hrs]:[min]:(sec) [message]". Max Time is 7 days.
wiki - Search Wikipedia for articles
image - Search Google Images
r34 - NSFW Search
boobs - r34 Search for boobs
r - Show reaction image
allr - Reaction image list 
spam - Repeat message 5 times (Cannot spam commands)
bigtext (shortcut "bt") - Changes characters to emoji counterpart
uptime - Bot uptime
wordcount - Amount of times a word has been said globally
userwordcount - Amount of times a word has been said by a user
copypasta - Pastes specificed copypasta 
copypasta-add - Add own copypasta
copypasta-list - Show list of copypastas
oof - Global oof counter
censorcheck - Checks if "er" censor is on/off
check - Amount of times the "die" command has been called
ping - Pong
gus - Gus copypasta
test - Johnny Test ASCII
egg - Random egg picture
cake - Random cake picture
juju - Spirit reading
toF- Celsius to Fahrenheit
toC- Fahrenheit to Celsius
simpemb - format is "(Title) [Subtext]"
blackjack - play blackjack with reactions

Voice Chat Commands:
play - bot text-to-speech, can identify iso for different accents/languages
iso - list of iso codes
commence - plays sound files in voice channel
allsound - list of sound files

Econ Commands:
stock/stocks - Check worth of stocks
balance/bal - Check your or another members balance
buy (max) - Buy stocks
sell (all) - Sell stocks
baltop - Top 10 richest members  
stocktop - Top 10 stock owners
pay - Give someone else money
speak - Speak as bot ($100)

Admin Commands:

status - Sets bot status message
songstatus (on/off) - Sets bot status to currently playing song
speak - Speak as bot (no charge)
prefix - Change server prefix
die - Terminates bot
censor - Turns on/off "er" censor

## Instructions

### Windows and Linux (run as non-sudo)

Clone this repository:
    Execute `git clone https://github.com/SWonton/wontonbot --branch master`
Now within the same folder:
    `npm install`
Now you should have a folder called node_modules. In this folder are all your installed packages.
Rename `config-example.json` to `config.json`
Edit the `config.json` file in any text editor:

1) Add your token at its respective position. [Instructions to get token](https://discordpy.readthedocs.io/en/latest/discord.html)
2) Add your Discord user ID, as well as any other admins' IDs at the `"owners"` line. [Instructions to get ID](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-)
3) Get a Merriam-Webster Dictionary API key by visiting their [website](https://dictionaryapi.com/)
4) Add your Merriam-Webster API key to the `dictionApiKey` line.

Run the bot by executing `node mybot.js`

To invite the bot to your server visit [this](https://discordpy.readthedocs.io/en/latest/discord.html#inviting-your-bot) tutorial.

## License

MIT

## Credits

Authors:
[s7agv](https://github.com/s7agv) and [SWonton](https://github.com/SWonton)