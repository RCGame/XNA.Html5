using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Content;

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
    }
}
