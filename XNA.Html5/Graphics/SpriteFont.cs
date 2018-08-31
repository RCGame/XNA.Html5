using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xna.Framework.Graphics;

namespace Microsoft.Xna.Framework.Graphics
{
    public class SpriteFont : GraphicsResource
    {
        public Vector2 MeasureString(string str)
        {
            return new Vector2(10, 10);
        }
    }
}
