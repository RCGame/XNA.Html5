using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bridge.Html5;

namespace Microsoft.Xna.Framework.Graphics
{
    internal class Html5
    {
        internal static HTMLCanvasElement Canvas;
        internal static CanvasRenderingContext2D Context;
    }

    public class GraphicsDevice
    {
        public Viewport Viewport { get; }

        public GraphicsDevice()
        {
            Html5.Canvas = new HTMLCanvasElement();
            Html5.Canvas.Width = Window.InnerWidth;
            Html5.Canvas.Height = Window.InnerHeight;
            Document.Body.AppendChild(Html5.Canvas);
            Html5.Context = Html5.Canvas.GetContext("2d").As<CanvasRenderingContext2D>();
            Console.WriteLine("canvas ready");
        }

        public void Clear(Color color)
        {
            Html5.Context.FillStyle = "#" + color.PackedValue.ToString("X");
            Html5.Context.FillRect(0, 0, Html5.Canvas.Width, Html5.Canvas.Height);
        }

        internal void Draw(DrawSpec spec)
        {

        }
    }
}
