/*using System;
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
using alpha;

namespace alpha
{
    public class Player
    {
        //private static Vector2 position;
        //private static int speed;
        //private static Rectangle boundBox;
        private static Texture2D newTex;
        //Constructor
        public Player(Texture2D texX) 
        {
            tex = texX;
        }
        public static Texture2D tex
        {
            get { return newTex; }
            set { newTex = value; }
        }
        public void LoadContent(ContentManager content) 
        {
            tex = content.Load<Texture2D>("textures\\arrow");
        }
      /*  public static int Speed
        {
            get { return speed; }
            set { speed = value; }
        }
        public static Rectangle BoundingBox
        {
            get { return boundBox; }
            set { boundBox = value; }
        }
        public virtual void Draw1() 
        {
        
        } 
 * 
 * */

        
  