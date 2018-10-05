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
    public class Balloons
    {
        List<Balloons> balloonList = new List<Balloons>();
        public Texture2D myBalloon;
        public Vector2 position;
        protected Rectangle boundingBox;
        public int speed;
        private static int Bwidth = 40, Bheight = 55;
        public bool isVisible;
        Random random = new Random();
        public float randomX, randomY;
        public static int BalloonWidth
        {
            get { return Bwidth; }
            set { Bwidth = value; }
        }
        public static int BalloonHeight
        {
            get { return Bheight; }
            set { Bheight = value; }
        }
        public Rectangle Bound
        {
            get { return boundingBox; }
            set { boundingBox = value; }
        }
        public Balloons(Texture2D newBalloon, Vector2 newPosition)
        {

            //randomX = random.Next(); //<<<<<<<<
            //randomY = random.Next(); //<<<<<<<<
            position = newPosition;
            myBalloon = newBalloon;
            speed = 2;
           
            isVisible = true;
        }
        public void LoadContent(ContentManager content)
        {
            myBalloon = content.Load<Texture2D>("textures\\balloon");
        }
        public void Draw(SpriteBatch mySprite)
        {
            if (isVisible)
            {
                mySprite.Draw(myBalloon, new Rectangle((int)position.X, (int)position.Y, Bwidth, Bheight), Color.White);
            }
        }
        public void Update(GameTime gameTime)
        {
            boundingBox = new Rectangle((int)position.X, (int)position.Y, Bwidth, Bheight);
            //Balloons moving up
            position.Y = position.Y - speed;
            int countR = random.Next(10, 35);

            int randomX = random.Next(10, 990);
            int randomY = random.Next(642, 3000);
            if (position.Y <= -200)
            {
                position.Y = randomY;
                position.X = randomX;
            }
           
           
        }

    }

}
