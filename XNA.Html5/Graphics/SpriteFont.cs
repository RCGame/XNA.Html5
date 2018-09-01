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
        public static string Font = "Arial Black";
        internal static int Size = 50;

        public Vector2 MeasureString(string str)
        {
            Html5.Context.Font = Size + "px " + Font;
            var m = Html5.Context.MeasureText(str);
            return new Vector2((float)m.Width, (float)Size);
        }
    }
}
