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
            Html5.Canvas.Width = Window.InnerWidth - 50;
            Html5.Canvas.Height = Window.InnerHeight - 50;
            Document.Body.AppendChild(Html5.Canvas);
            Html5.Context = Html5.Canvas.GetContext("2d").As<CanvasRenderingContext2D>();
            //Console.WriteLine("canvas ready");
        }

        public void Clear(Color color)
        {
            Html5.Context.FillStyle = "#" + color.PackedValue.ToString("X");
            Html5.Context.FillRect(0, 0, Html5.Canvas.Width, Html5.Canvas.Height);
        }

        internal void Draw(DrawSpec spec)
        {
            if (spec.transform != null)
            {
            }

            foreach (var sprite in spec.spriteSpecs)
            {
                Html5.Context.Save();
                Html5.Context.Translate(sprite.position.X, sprite.position.Y);
                Html5.Context.Rotate(sprite.rotation);
                float dx = -sprite.origin.X;
                float dy = -sprite.origin.Y;
                //Console.WriteLine(sprite.texture.Name + " dx: " + dx + " dy: " + dy);
                float dw = sprite.texture.Width * (sprite.useVScale ? sprite.vScale.X: sprite.scale);
                float dh = sprite.texture.Height * (sprite.useVScale ? sprite.vScale.Y : sprite.scale);
                Html5.Context.DrawImage(sprite.texture.Image,
                    dx, dy, dw, dh
                    );
                Html5.Context.Restore();
            }

            if (spec.transform != null)
            {
            }
        }
    }
}
