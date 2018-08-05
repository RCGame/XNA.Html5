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

        public GameComponentCollection Components
        {
            get { return _components; }
        }

        protected virtual void Initialize()
        {

        }

        protected virtual void LoadContent()
        {

        }

        protected virtual void Update(GameTime gameTime)
        {

        }

        protected virtual void Draw(GameTime gameTime)
        {

        }

        public void Run()
        {
            HTMLCanvasElement canvas = new HTMLCanvasElement();
            canvas.Width = Window.OuterWidth;
            canvas.Height = Window.OuterHeight;
            Document.Body.AppendChild(canvas);
            var ctx = canvas.GetContext("2d").As<CanvasRenderingContext2D>();
            ctx.FillRect(20, 20, 150, 100);
        }

        public void Exit()
        {

        }
    }
}
