using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Audio;
using Microsoft.Xna.Framework.Content;
using Microsoft.Xna.Framework.GamerServices;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;
using Microsoft.Xna.Framework.Media;


namespace alpha
{
    public class Arrow
    {
        //class variables
        public Rectangle boundingBox;
        public Texture2D myArrow;
        public Vector2 position;
        public bool isVisible;
        public int speed;
        private static int Awidth = 95, Aheight = 105;
        //Constructor
        //public static Player myArrow { get; set; }
        public Arrow(Texture2D newArrow)
        {
            speed = 8;
            myArrow = newArrow;
            isVisible = false;
        }  
        public static int ArrWidth  
        {
            get { return Awidth; }
            set {Awidth = value;}
        }
        public static int ArrHeight
        {
            get { return Aheight; }
            set { Aheight = value; }
        }
       
        public void Draw(SpriteBatch spriteBatch)
        {
            spriteBatch.Draw(myArrow, new Rectangle((int)position.X,(int)position.Y,Awidth,Aheight), Color.White);
        }
       
    }
}
