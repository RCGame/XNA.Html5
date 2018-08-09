using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bridge.Html5;

namespace Microsoft.Xna.Framework.Graphics
{
    public class Html5
    {
        public static HTMLCanvasElement Canvas;
        public static CanvasRenderingContext2D Context;
    }

    public class GraphicsDevice
    {
        public Viewport Viewport { get; }

        public GraphicsDevice()
        {

        }

        public void Clear(Color color)
        {

        }
    }
}
