using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Audio;
using Microsoft.Xna.Framework.Content;
using Microsoft.Xna.Framework.GamerServices;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;
using Microsoft.Xna.Framework.Media;

namespace alpha
{
    public class PauseComponent
    {
        public MouseState mouse, prevMouse;
        public KeyboardState keyboard, prevKeyboard;
        protected SpriteFont myFont;
        protected int selected = 0;
        public List<string> ButtonList = new List<string>();

        public PauseComponent()
        {
            ButtonList.Add("Resume");
            ButtonList.Add("Exit");
        }
        public void LoadContent(ContentManager content)
        {
            myFont = content.Load<SpriteFont>("Fonts\\buttons");
        }
        public void Update(GameTime gametime)
        {
            mouse = Mouse.GetState();
            keyboard = Keyboard.GetState();
            if (checkKeyBoard(Keys.Up))
            {
                if (selected > 0)
                    selected--;
            }
            if (checkKeyBoard(Keys.Down))
            {
                if (selected < ButtonList.Count - 1)
                    selected++;
            }
            if (checkKeyBoard(Keys.Enter))
            {
                switch (selected)
                {
                    case 0:
                        BalloonShooter.GameState = "Playing";

                        break;
                    case 1:
                        BalloonShooter.GameState = "Exit";
                        break;
                }
            }
            prevMouse = mouse;
            prevKeyboard = keyboard;

        }
        public bool checkMouse()
        {
            return (mouse.LeftButton == ButtonState.Pressed && prevMouse.LeftButton == ButtonState.Released);
        }
        public bool checkKeyBoard(Keys key)
        {
            return (keyboard.IsKeyDown(key) && !prevKeyboard.IsKeyDown(key));
        }
        public void Draw(SpriteBatch mySprite)
        {
            int LinePadding = 40;
            Color colour;
            for (int i = 0; i < ButtonList.Count; i++)
            {
                colour = (i == selected) ? Color.Crimson : Color.Black;
                mySprite.DrawString(myFont, ButtonList[i],
                    new Vector2(((BalloonShooter.Screenwidth / 2) - (myFont.MeasureString(ButtonList[i]).X / 2)),
                        (BalloonShooter.Screenheight / 2) - (myFont.LineSpacing * ButtonList.Count / 2) + (myFont.LineSpacing + LinePadding * i)),
                    colour);
            }

        }
    }
}