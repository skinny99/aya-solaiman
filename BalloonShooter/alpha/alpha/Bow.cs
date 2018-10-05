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
using alpha;
namespace alpha
{
    public class Bow
    {
        public Texture2D myBow,myArrow;
        public Vector2 position;
        public int speed;
        public Rectangle boundBox;
        public int Pwidth=100, Pheight=80;
        public float arrowDelay; //waiting time for next arrow
        const float delay = 5; //the waiting time
        public List<Arrow> arrowList;
        //public Player myArrow { get; set; }
        //MusicManager Sound = new MusicManager();
        //Constructor
        public Bow()
        {
            myBow = null;
            arrowList = new List<Arrow>();
            position = new Vector2(0,0);
            speed = 2;
            arrowDelay = delay;
        }
        public void LoadContent(ContentManager content)
        {
            myBow = content.Load<Texture2D>("textures\\bow");
            myArrow = content.Load<Texture2D>("textures\\arrow");


        }
        public void  Draw(SpriteBatch mySprite)
        {
            mySprite.Draw(myBow, new Rectangle((int)position.X, (int)position.Y, Pwidth, Pheight), Color.White);
            foreach (Arrow A in arrowList)
                A.Draw(mySprite);
        }
        
        public void shoot()
        {

            if (arrowDelay > 0)
                arrowDelay--;

            if (arrowDelay <= 0)
            {
                //Sound.ShootingSound.Play();

                Arrow newArrow = new Arrow(myArrow);
                // set boundes to arrow
                if (position.X <= 0)
                    position.X = 0;

                if (position.Y <= 0)
                    position.Y = 0;

                if (position.X >= BalloonShooter.Screenwidth -  Arrow.ArrWidth)
                    position.X = BalloonShooter.Screenwidth - Arrow.ArrWidth;

                if (position.Y >= BalloonShooter.Screenheight - Arrow.ArrHeight)
                    position.Y = BalloonShooter.Screenheight - Arrow.ArrHeight;

                newArrow.position = new Vector2(position.X, position.Y);
                newArrow.isVisible = true;

                if (arrowList.Count < delay)
                    arrowList.Add(newArrow);
            }

            if (arrowDelay == 0)
                arrowDelay = delay;

        }
        public void updateArrow()
        {

            foreach (Arrow A in arrowList)
            {
                A.boundingBox = new Rectangle((int)A.position.X + Arrow.ArrWidth / 2, (int)A.position.Y, 0, 0);

                //set the movement of the arrow
                A.position.Y = A.position.Y - A.speed;

                if (A.position.Y <= 0)
                    A.isVisible = false;


            }

            for (int i = 0; i < arrowList.Count; i++)
            {
                if (!(arrowList[i].isVisible))
                {
                    arrowList.RemoveAt(i);
                    i--;
                }

            }

        }


    }
    public class newShooter : Bow {
        public void update(GameTime gametime)
        {
            //boundBox = new Rectangle((int)position.X, (int)position.Y, Pwidth, Pheight);
            //shooter control
            MouseState mouse = Mouse.GetState();
            position.X = Mouse.GetState().X;
            position.Y = Mouse.GetState().Y;
            if (Mouse.GetState().LeftButton == ButtonState.Pressed)
            {
                shoot();
            }
            updateArrow();
            //bounds control                
            if (position.X <= 0)
                position.X = 0;

            if (position.Y <= 0)
                position.Y = 0;

            if (position.X >= BalloonShooter.Screenwidth - Pwidth)
                position.X = BalloonShooter.Screenwidth - Pwidth;

            if (position.Y >= BalloonShooter.Screenheight - Pheight)
                position.Y = BalloonShooter.Screenheight - Pheight;


        }

    }
}
