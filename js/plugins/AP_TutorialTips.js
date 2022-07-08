//=============================================================================
/*:
 * @author NoLongerLucky
 * @plugindesc Requires SRD_PreloaderCore, Olivia_MetaControls. Overrides Scene_Preload, Window_TitleCommand, Scene_Title. Adds Window_TipsPage.
 */
//=============================================================================

const tips = [
	"You can press SHIFT when the text window is open to view a message backlog.",
	"Pay attention to your surroundings. You can find hidden chests in the most bizarre of places.",
	"The options menu has a wide variety of... well, options. Give it a look and personalize your experience.",
	"You can retry battles, but at a tax of 10% of your Bit balance. Don't take losing too lightly.",
	"Party members wake up after resting with varying moods. The Status menu can enlighten you in regards to how they're feeling.",
	"Certain inns are \"premium\" inns. These will cost an extra 50% Bits to rest at, but will give the very useful Well Rested buff.",
	"Dark enemies grow stronger after the sun sets. They become much harder to fight, but have a better chance of dropping powerful equipment.",
	"Legends speak of eons-old crystals formed when the universe was created. They still exist... somewhere.",
	"Use your BP wisely. Waiting an extra turn to get one more boost can make the difference between winning or losing.",
	"The heat of battle is enough to make anyone nervous. Don't let pressure cloud your judgement. Think before you act./",
	"Buffs and debuffs can increase or decrease a stat by 50% max. Don't underestimate them!",
	"Don't forget item upgraders exist. If you find yourself stuck on a difficult fight, consider min-maxing your equipment.",
	"AP is gained exponentially. Growth starts slow, but a level 100 party member would have 10,000 AP!",
	"Every level up gives you more AP and JP. Don't forget to see what new allocations you can make after every new level.",
	"Skills are separated into Special, Magic, and Passive categories.",
	"Shops contain many useful items to aid your adventure. Be sure to check them out from town to town!",
	"With the link between the Above and the Overworld severed, the Immortals can no longer reach us.",
	"Adon is only one continent in the Overworld, with its culture largely separated from Telluria's.",
	"The continent of Telluria is split into many regions. Telluria Castle is located in Telluria Field on the northern end of the landmass.",
	"The Gulf of Telluria borders many unique regions. Taking a ship into it is a quick way to reach many new places.",
	"These Tutorial Tips used to show up in-game and interrupt you. Doesn't that sound annoying?",
	"These Tutorial Tips were added in Alpha 14!",
	"Sleeping in your own bed will always be free.",
	"The sun falls at 21:00 and rises at 5:00. Plan out your days efficiently!",
	"People have been whispering rumors of a mysterious merchant that sets up shop in the Blazing Sands at night.",
	"Every copy of The Trail is personalized. But all jokes aside, it's true. A per-playthrough seed determines some random events.",
	"Sleeping at a premium inn will neutralize the entire team's moods.",
	"Areas of the Overworld with a blue arrow over them need to be interacted with to be entered. They're not inaccessible, just less annoying.",
	"This specific text will never show up because it's replaced later down in the code. Congrats on finding an easter egg!",
	"The Quick Access Menu is a helpful utility. Check it out using your configured key for it (Q by default).",
	"Anything that regrows has its own unique timer that ticks down every in-game hour.",
	"Blueberries regrow after a mere 16 in-game hours, while some oreleaf variants need triple-digit times to sprout once more.",
	"Oreleaf can be found in the mine north of Bladesville. It's a mysterious metallic plant that yields ore and regrows after some time.",
	"Ghostly enemies will halve incoming physical damage. Use magic to do normal damage to them.",
	"The entirety of the game is still playable with just a mouse. All you need is left and right clicks.",
	"Running away is guaranteed to be successful on the first turn of battle.",
	"After the 1st turn of battle, the base escape success chance is 20%. Each failed escape attempt boosts this chance by 10%.",
	"Matilda sells Small Potions and Small Elixirs at a 10% discount.",
	"Navigate in the equipment menu using your configured left and right keys to see upgrade slots and equip restrictions.",
	"Press F2 to see an FPS counter in the top-left.",
	"No one really knows how Sam Payne's fast travel doors work, but no matter; they're still very useful for getting around quickly.",
	"INT is a unique stat. It's hard to grow, but can greatly increase your crit multiplier.",
	"Level up your skills by using them! Each level requires 5 more uses than the previous... 275 in total for level 10.",
	"Each level of skill mastery boosts damage/healing by 2% and reduces MP cost by 2%.",
	"Don't forget about the skill learn menu! Not every skill you can get will be learned just by leveling up.",
	"The shop menu's stat comparison for accessories will compare the accessory you are buying to whatever is equipped in the first accessory slot.",
	"Even a 100% hit rate doesn't guarantee every attack to land. Accuracy is just HIT minus EVA, after all.",
	"All the delete button does is append .bak to your save file. If you accidentally delete a save, it should still be in your save folder.",
	"Don't be quick to sell materials. You never know when you might need some for a crafting recipe.",
	"Laeryidyean's defeat brings some rare enemies out of hiding. Maybe you'll get lucky on a random encounter...",
	"A huge surge of magical energy has been detected at Telluria Castle in the past decade. What could it be...?",
	"JP is useful for allocating stats and learning new skills.",
	"He is always watching you.",
	"True attacks are neither physical nor magical hits. These are usually skills or items that only apply status effects.",
	"Upgrading your pickaxe is a daunting task, but it can pay itself back quickly if you're a dedicated miner.",
	"The Stat Master in Haven Harbor can go into great detail about every attribute in the game.",
	"The Champion's Talisman increases in strength as your journey continues. You can get it from a nun outside the Verdin Village church.",
	"Fishing might seem boring, but it's a relaxing and useful hobby. You can cook up some powerful food using your catches.",
	"A certain someone at the Adventurer's Guild will resell you one-time items.",
	"Beware of Darkhounds roaming the land at night. They collapse into a pile of bones upon defeat, and are re-animated every time the moon rises.",
	"Using accessory slots on JP-boosting equips might seem wasteful, but JP is a valuable resource you'll want a lot of down the line.",
	"Managing MP might not seem hard at first, but it becomes a daunting task later on in your journey. Strong skills guzzle huge amounts of the stuff!"
]

tips[28] = "There's a total of " + tips.length + " Tutorial Tips that you can see here. Have you seen all of them?"; // tips.length is first defined with the array, so it cannot be used initially

pushSeen = [];

//=============================================================================
// Scene_Preload
//=============================================================================

Scene_Preload.prototype.create = function() {
	Scene_Base.prototype.create.call(this);
	this.createBackground();
	this.createSubtitle();
	this.createTip();
	ImageManager.clear();
};

Scene_Preload.prototype.createTip = function() {
	this._tipHeight = Graphics.boxHeight;
	this._tip = new Sprite(new Bitmap(Graphics.boxWidth, this._tipHeight));
	this._tip.bitmap.fontSize = 20;
	this._tip.y = -400;
	this._tip.move = 0;
	this._tip.tipSpeed = 1.1; // speed that tutorial tip slides in/out
	this._tip.tipWait = 4000; // wait time between sliding tip in/out and refreshing tip
	this.addChild(this._tip);
	setTimeout(() => {  this.newTip(); }, 750);
}

Scene_Preload.prototype.newTip = function() {
	this._tip.chosenTip = Math.floor(Math.random() * tips.length);
    pushSeen[this._tip.chosenTip] = true;
	this._tip.y = -400;
	this._tip.move = 0;
	this.drawTipIn();
}

Scene_Preload.prototype.refreshTip = function() {
	this._tip.bitmap.clear();
	this._tip.bitmap.drawText("TUTORIAL TIP", 0, -30, Graphics.boxWidth, this._tipHeight, 'center');
	this._tip.bitmap.drawText("#" + (this._tip.chosenTip + 1) + ": " + tips[this._tip.chosenTip], 0, 0, Graphics.boxWidth, this._tipHeight, 'center');
}

Scene_Preload.prototype.drawTipIn = function() {
	this._tip.move++;
	if (this._tip.move < 250) {
		this._tip.y += (this._tip.tipSpeed / (this._tip.move * 0.04));
		this.refreshTip();
		setTimeout(() => {  this.drawTipIn(); }, 1);
	} else {
		this._tip.move = 0;
		setTimeout(() => {  this.drawTipOut(); }, this._tip.tipWait);
	}
}

Scene_Preload.prototype.drawTipOut = function () {
	this._tip.move++;
	if (this._tip.move < 250) {
		this._tip.y -= (this._tip.tipSpeed / (this._tip.move * 0.04));
		this.refreshTip();
		setTimeout(() => {  this.drawTipOut(); }, 1);
	} else {
		this._tip.move = 0;
		setTimeout(() => {  this.newTip(); }, this._tip.tipWait / 4);
    }
}

//=============================================================================
// Window_TitleCommand
//=============================================================================

_Window_TitleCommand_makeCommandList =
  Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function() {
  _Window_TitleCommand_makeCommandList.call(this);
  var index = this.findSymbol('tips');
  var text = "Tutorial Tips";
  var enabled = true;
  this.addCommandAt(index, text, 'tips', enabled);
};

//=============================================================================
// Window_TipsPage
//=============================================================================

function Window_TipsPage() {
    this.initialize.apply(this, arguments);
}

Window_TipsPage.prototype = Object.create(Window_Command.prototype);
Window_TipsPage.prototype.constructor = Window_TipsPage;

Window_TipsPage.prototype.initialize = function() {
  Window_Command.prototype.initialize.call(this, 0, 0);
  this.updatePlacement();
  this.openness = 0;
};

Window_TipsPage.prototype.windowWidth = function() {
  return 96;
};

Window_TipsPage.prototype.windowHeight = function() {
    return 252;
}

Window_TipsPage.prototype.updatePlacement = function() {
    this.x = 760;
    this.y = 372;
}

Window_TipsPage.prototype.makeCommandList = function() {
  for (var i = 0; i < tips.length; ++i) {
    var text = "#" + (i + 1);
    if (!text) continue;
    if (text === '') continue;
    if (seen[i] !== true) {
        this.addCommand(text, '', false);
    } else {
        this.addCommand(text, 'ok', true, i);
    }
  }
};

Window_TipsPage.prototype.drawItem = function(index) {
  var rect = this.itemRectForText(index);
  var align = this.itemTextAlign();
  var text = this.commandName(index);
  this.resetTextColor();
  this.changePaintOpacity(this.isCommandEnabled(index));
  this.drawTextEx(text, rect.x, rect.y, rect.width, align);
};

Window_TipsPage.prototype.playOkSound = function() {
  if (this.currentExt() !== '') SoundManager.playOk();
};

//=============================================================================
// Scene_Title
//=============================================================================

var _Scene_Title_createCommandWindow = 
    Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function() {
    _Scene_Title_createCommandWindow.call(this);
    this.createTipsWindow();
    this.createTip();
    this._commandWindow.setHandler('tips',  this.commandTips.bind(this));
}

Scene_Title.prototype.createTipsWindow = function() {
    this._tipsWindow = new Window_TipsPage();
    this._tipsWindow.setHandler('cancel', this.onTipsCancel.bind(this));
    this._tipsWindow.setHandler('ok', this.onTipsOk.bind(this));
    this.addWindow(this._tipsWindow);
}

Scene_Title.prototype.commandTips = function() {
    this._tipsWindow.select(0);
    this._tipsWindow.activate();
    this._tipsWindow.open();
}

Scene_Title.prototype.onTipsCancel = function() {
    this._tipsWindow.close();
    this._tip.bitmap.clear();
    this._commandWindow.activate();
    this._commandWindow.open();
}

Scene_Title.prototype.onTipsOk = function() {
    this._tipsWindow.activate();
    this.newTip(this._tipsWindow.currentExt());
}

Scene_Title.prototype.createTip = function() {
	this._tipHeight = Graphics.boxHeight;
	this._tip = new Sprite(new Bitmap(Graphics.boxWidth, this._tipHeight));
	this._tip.bitmap.fontSize = 20;
	this._tip.y = -250;
	this.addChild(this._tip);
}

Scene_Title.prototype.newTip = function(tipId) {
	this._tip.chosenTip = tipId;
	this._tip.bitmap.clear();
	this._tip.bitmap.drawText("TUTORIAL TIP", 0, -30, Graphics.boxWidth, this._tipHeight, 'center');
	this._tip.bitmap.drawText("#" + (this._tip.chosenTip + 1) + ": " + tips[this._tip.chosenTip], 0, 0, Graphics.boxWidth, this._tipHeight, 'center');
}

// seen array calculation

var Scene_Title_initialize = Scene_Title.prototype.initialize;
Scene_Title.prototype.initialize = function() {
    Scene_Title_initialize.call(this);
    this.calcSeen();
}

Scene_Title.prototype.calcSeen = function() {
    if ($gameVariables.value(73) == 0) {
        pullSeen = [];
    } else {
        pullSeen = $gameVariables.value(73);
    }
    for (i = 0; i < pushSeen.length; i++) {
        if (pullSeen[i] !== true) {
            pullSeen[i] = pushSeen[i];
        }
    }
    seen = pullSeen;
    $gameVariables.setValue(73, pullSeen);
}
