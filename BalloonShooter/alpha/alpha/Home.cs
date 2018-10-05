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
    ///  main type for the game
    public class BalloonShooter : Microsoft.Xna.Framework.Game
    {
        GraphicsDeviceManager graphics;
        SpriteBatch spriteBatch;
        private static int screenWidth, screenHeight; //main screen height & width
        Texture2D myBk; //texture for background
        List<Balloons> balloonList = new List<Balloons>(); //list of balloon class
        List<Texture2D> myList = new List<Texture2D>(); //list for some texture in main menu
        List<Explosion> explosionList = new List<Explosion>(); //list for explosions
        Texture2D menuObject; //texture for menu buttons
        Rectangle mainFrame;
        Texture2D PauseState; //for pausing
        public static string GameState = "MainMenu"; //controls game states
        Random RandPlaying = new Random(); //random for playing state
        Random randMenu = new Random(); //random for mainmenu state
        newShooter shooter = new newShooter();
        MenuButtons Mbuttons = new MenuButtons(); 
        PauseComponent Pbuttons = new PauseComponent();
    
        //constructor
        public static int Screenwidth
        {
            get { return screenWidth; }
            set { screenWidth = value; }
        }
        public static int Screenheight
        {
            get { return screenHeight; }
            set { screenHeight = value; } 
        }
        public BalloonShooter()
        {
            graphics = new GraphicsDeviceManager(this);
            graphics.IsFullScreen = false;
            this.Window.Title = "Balloon Shooter";
            Content.RootDirectory = "Content";
        }

       
        protected override void Initialize()
        {

            base.Initialize();
        }

        /// LoadContent will be called once per game and is the place to load all of your content.
        protected override void LoadContent()
        {
            // Create a new SpriteBatch, which can be used to draw textures.
            spriteBatch = new SpriteBatch(GraphicsDevice);
            myBk = Content.Load<Texture2D>("textures\\Bk");
            menuObject = Content.Load<Texture2D>("textures\\menu1");
            for (int i = 0; i < 10; i++)
            {
                myList.Add(Content.Load<Texture2D>("textures\\balloon"));
            }
            screenWidth = Window.ClientBounds.Right - Window.ClientBounds.Left;
            screenHeight = Window.ClientBounds.Bottom-Window.ClientBounds.Top;
            shooter.LoadContent(Content);
            //balloon.LoadContent(Content);
            Mbuttons.LoadContent(Content);
            Pbuttons.LoadContent(Content);
           
            //MediaPlayer.Play(Sounds.BackgroundMusic);

        }

        /// UnloadContent will be called once per game and is the place to unload all content.
        protected override void UnloadContent()
        {
            
        }

       
        /// <param name="gameTime">Provides a snapshot of timing values.</param>
        bool IsPaused = false;
        //KeyboardState keyState, keyStateOld;
        protected override void Update(GameTime gameTime)
        {
            //keyState = Keyboard.GetState();
            // exit
            if (GamePad.GetState(PlayerIndex.One).Buttons.Back == ButtonState.Pressed || GameState == "Exit")
                this.Exit();
            switch(GameState)
            {
                case "Loading":
                    break;
                case "MainMenu":
                    this.IsMouseVisible = false;
                    Mbuttons.Update(gameTime);
                    
                    break;
                case "Playing":
                    {
                        if (IsPaused) 
                        {
                            Pbuttons.Update(gameTime);

                        }
                        else if (!IsPaused)
                        {
                            if (Keyboard.GetState().IsKeyDown(Keys.Escape))
                            {
                                IsPaused = true;
                                
                            }
                            shooter.update(gameTime);
                            foreach (Balloons balloon in balloonList)
                            {
                                for (int i = 0; i < shooter.arrowList.Count; i++)
                                {
                                    if (balloon.Bound.Intersects(shooter.arrowList[i].boundingBox))
                                    {
                                        
                                        explosionList.Add(new Explosion(Content.Load<Texture2D>("textures\\explosion"),
                                            new Vector2(balloon.position.X + Balloons.BalloonWidth / 2, balloon.position.Y + Balloons.BalloonHeight / 2)));

                                        // hud.playerScore += 20;
                                        balloon.isVisible = false; //balloons
                                    }

                                }

                                balloon.Update(gameTime);


                            }
                            foreach (Explosion ex in explosionList)
                            {
                                ex.update(gameTime);
                            }
                            manageExplosion();
                            LoadBalloon();
                        }
                        //keyStateOld = keyState;
                        break;
                    }
                case "GameOver":

                    break;
                case "Controls":
                    
                    break;
                
                
            }
            
            
           
            
            base.Update(gameTime);
            
        }

        /// This is called when the game should draw itself.
        /// <param name="gameTime">Provides a snapshot of timing values.</param>
        protected override void Draw(GameTime gameTime)
        {
            GraphicsDevice.Clear(Color.CornflowerBlue);
            
            spriteBatch.Begin();
            switch (GameState)
            {
                case "MainMenu":
                    {
                        randMenu = new Random(seed);
                        spriteBatch.Draw(myBk, mainFrame, Color.White);
                        mainFrame = new Rectangle(0, 0, screenWidth, screenHeight);
                        spriteBatch.Draw(menuObject, new Rectangle(3,3,300,300), Color.White);
                        foreach (Texture2D Object in myList)
                        {
                            
                                spriteBatch.Draw(Object, new Rectangle(randMenu.Next(500), randMenu.Next(500),30,45), Color.White);
                            
                        }
                        Mbuttons.Draw(spriteBatch);
                        break;
                    }
                case "Playing":
                    {
                            spriteBatch.Draw(myBk, mainFrame, Color.White);
                            mainFrame = new Rectangle(0, 0, screenWidth, screenHeight);
                            if (Keyboard.GetState().IsKeyDown(Keys.Escape)) Pbuttons.Draw(spriteBatch);                   
                            //spriteBatch.DrawString(null, "X : ", new Vector2(20, 30), Color.Red);
                            foreach (Balloons balloon in balloonList)
                            {
                                balloon.Draw(spriteBatch);
                            }
                            
                            LoadBalloon();
                            foreach (Explosion ex in explosionList)
                            {
                                ex.Draw(spriteBatch);
                            }
                            shooter.Draw(spriteBatch);
                        break;
                    }
                case "GameOver":
                    {
                        spriteBatch.Draw(myBk, mainFrame, Color.White);
                        mainFrame = new Rectangle(0, 0, screenWidth, screenHeight);
                        break;
                    }
                case "Controls":
                    {
                        spriteBatch.Draw(myBk, mainFrame, Color.White);
                        mainFrame = new Rectangle(0, 0, screenWidth, screenHeight);
                        break;
                    }
                
            }
            
            spriteBatch.End();
            base.Draw(gameTime);
        }
        public void LoadBalloon()
        {
            //control range number of balloons
            int countRandom = RandPlaying.Next(10,35); 
            if (balloonList.Count < countRandom)
            {
                int randomX = RandPlaying.Next(10,screenWidth-10);
                int randomY = RandPlaying.Next(screenHeight+100, screenHeight+3000);
                balloonList.Add(new Balloons(Content.Load<Texture2D>("textures\\balloon"), new Vector2(randomX, randomY)));

            }

            //removing balloon from list
            for (int i = 0; i < balloonList.Count; i++)
            {
                if (!(balloonList[i].isVisible))
                {
                    balloonList.RemoveAt(i);
                    i--;
                }

            }
        }
        public void manageExplosion()
        {
            for (int i = 0; i < explosionList.Count; i++)
            {
                if (!(explosionList[i].isVisible))
                {
                    explosionList.RemoveAt(i);
                    i--;
                }
            }
        }
        public int seed { get; set; }

    }
}
