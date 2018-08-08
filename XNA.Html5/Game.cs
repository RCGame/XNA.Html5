using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Content;
using Bridge;
using Bridge.Html5;

namespace Microsoft.Xna.Framework
{
    public class Game
    {
        private GameComponentCollection _components;
        public GraphicsDevice GraphicsDevice { get; set; }
        public bool IsActive { get; set; }
        public ContentManager Content { get; set; }
        public bool IsFixedTimeStep { get; set; }
        private GameTime gameTime;
        private DateTime timeNow;
        private int leadingTime;
        private const int FPS = 1;
        private int timeoutId = 0;
        public GameComponentCollection Components
        {
            get { return _components; }
        }

        public Game()
        {
            _components = new GameComponentCollection();
        }

        protected virtual void Initialize()
        {

        }

        protected virtual void LoadContent()
        {

        }

        protected virtual void Update(GameTime gameTime)
        {
            foreach (GameComponent com in _components)
            {
                com.Update(gameTime);
            }
            Draw(gameTime);
        }

        protected virtual void Draw(GameTime gameTime)
        {
            foreach (DrawableGameComponent com in _components)
            {
                com.Draw(gameTime);
            }            
        }

        public void Run()
        {
            HTMLCanvasElement canvas = new HTMLCanvasElement();
            canvas.Width = Window.OuterWidth;
            canvas.Height = Window.OuterHeight;
            Document.Body.AppendChild(canvas);
            var ctx = canvas.GetContext("2d").As<CanvasRenderingContext2D>();
            gameTime = new GameTime();
            gameTime.TotalGameTime = new TimeSpan(0);
            gameTime.ElapsedGameTime = new TimeSpan(0);
            timeNow = DateTime.Now;
            GameLoop();
        }

        private void GameLoop()
        {
            Window.ClearTimeout(timeoutId);
            gameTime.ElapsedGameTime = DateTime.Now - timeNow;
            gameTime.TotalGameTime += gameTime.ElapsedGameTime;
            timeNow = DateTime.Now;
            leadingTime = Convert.ToInt32((1000f / (double)FPS) - gameTime.ElapsedGameTime.TotalMilliseconds);
            System.Console.WriteLine("elapsedTime: " + gameTime.ElapsedGameTime.TotalMilliseconds + " totalTime: " + gameTime.TotalGameTime.TotalSeconds + " leadingTime: " + leadingTime);
            if (leadingTime <= 0)
            {
                leadingTime = 1;
            }
            timeoutId = Window.SetTimeout(() =>
            {
                Update(gameTime);
                Draw(gameTime);
                GameLoop();
            }, leadingTime);
        }

        public void Exit()
        {

        }
    }
}
