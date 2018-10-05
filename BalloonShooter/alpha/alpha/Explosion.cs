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
    public class Explosion
    {
        public Texture2D Explode;
        public Vector2 position;
        public Vector2 origin;
        public float timer, interval;
        public int currentFrame, ExplodeWidh, ExplodeHeight;
        public Rectangle sorceREC;
        public bool isVisible;

        //constructor
        public Explosion(Texture2D newTexture, Vector2 newPosition)
        {
            Explode = newTexture;
            position = newPosition;
            timer = 0f;
            interval = 20f;
            currentFrame = 1;
            ExplodeWidh = 117;
            ExplodeHeight = 118;
            isVisible = true;

        }

        //load content
        // public void loadContent(ContentManager Content)
        // { 

        // }

        public void update(GameTime gametime)
        {
            timer += (float)gametime.ElapsedGameTime.TotalMilliseconds;

            if (timer > interval)
            {
                //show next frame
                currentFrame++;
                //rest the timer
                timer = 0f;
            }

            // if we in the last frame, make the explosion invisible and set the current frame to the 1st spritesheet
            if (currentFrame == 17)
            {
                isVisible = false;
                currentFrame = 0;
            }

            sorceREC = new Rectangle(currentFrame * ExplodeWidh, 0, ExplodeWidh, ExplodeHeight);

            origin = new Vector2(sorceREC.Width / 2, sorceREC.Height / 2);

        }

        //draw explosion
        public void Draw(SpriteBatch spriteBatch)
        {
            if (isVisible)
            {

                spriteBatch.Draw(Explode, position, sorceREC, Color.White, 0f, origin, 0.9f, SpriteEffects.None, 0);
            }
        }

    }
}
    

