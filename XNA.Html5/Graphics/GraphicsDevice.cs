using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xna.Framework.Input;
using Microsoft.Xna.Framework.Input.Touch;
using Bridge.Html5;

namespace Microsoft.Xna.Framework.Graphics
{
    internal class Html5
    {
        internal static HTMLCanvasElement Canvas;
        internal static CanvasRenderingContext2D Context;
        internal static MouseState MouseState;
        internal static List<TouchLocation> Touches = new List<TouchLocation>();
    }

    public class GraphicsDevice
    {
        public Viewport Viewport { get; private set; }

        public GraphicsDevice()
        {
            Html5.Canvas = new HTMLCanvasElement();
            Html5.Canvas.Width = Window.InnerWidth;
            Html5.Canvas.Height = Window.InnerHeight;
            Document.Body.AppendChild(Html5.Canvas);
            Viewport = new Viewport(0, 0, Html5.Canvas.Width, Html5.Canvas.Height);
            Html5.Context = Html5.Canvas.GetContext("2d").As<CanvasRenderingContext2D>();
            Document.Body.SetAttribute("style", "margin:0px;overflow:hidden;");
            Html5.Canvas.OnMouseDown = (e) =>
            {
                Html5.MouseState = new MouseState();
                Html5.MouseState.LeftButton = ButtonState.Pressed;
                Html5.MouseState.Position = new Point(e.ClientX, e.ClientY);
            };
            Html5.Canvas.OnMouseUp = (e) =>
            {
                Html5.MouseState = new MouseState();
                Html5.MouseState.LeftButton = ButtonState.Released;
                Html5.MouseState.Position = new Point(e.ClientX, e.ClientY);
            };
            Document.Body.OnTouchStart = (e) =>
            {
                e.PreventDefault();
            };
            Html5.Canvas.OnTouchStart = (e) =>
            {
                e.PreventDefault();
                Html5.Touches.Clear();
                foreach (var touch in e.Touches)
                {
                    TouchLocation loc = new TouchLocation(0, TouchLocationState.Pressed, new Vector2(touch.ClientX, touch.ClientY));
                    Html5.Touches.Add(loc);
                }
            };
            Html5.Canvas.OnTouchMove = (e) =>
            {
                e.PreventDefault();
                if (TouchPanel.didPress)
                {
                    Html5.Touches.Clear();
                    foreach (var touch in e.Touches)
                    {
                        TouchLocation loc = new TouchLocation(0, TouchLocationState.Moved, new Vector2(touch.ClientX, touch.ClientY));
                        Html5.Touches.Add(loc);
                    }
                }
            };
            Html5.Canvas.OnTouchEnd = (e) =>
            {
                e.PreventDefault();
                List<TouchLocation> locs = new List<TouchLocation>();
                foreach (var touch in Html5.Touches)
                {
                    TouchLocation loc = new TouchLocation(0, TouchLocationState.Released, new Vector2(touch.Position.X, touch.Position.Y));
                    locs.Add(loc);
                }
                Html5.Touches.Clear();
                Html5.Touches = locs;
            };
            Html5.Canvas.OnTouchLeave = (e) =>
            {
                e.PreventDefault();
                List<TouchLocation> locs = new List<TouchLocation>();
                foreach (var touch in Html5.Touches)
                {
                    TouchLocation loc = new TouchLocation(0, TouchLocationState.Released, new Vector2(touch.Position.X, touch.Position.Y));
                    locs.Add(loc);
                }
                Html5.Touches.Clear();
                Html5.Touches = locs;
            };
            Window.OnResize = (e) =>
            {
                Html5.Canvas.Width = Window.InnerWidth;
                Html5.Canvas.Height = Window.InnerHeight;
                Viewport = new Viewport(0, 0, Html5.Canvas.Width, Html5.Canvas.Height);
            };
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
                float dx = -sprite.origin.X * (sprite.useVScale ? sprite.vScale.X : sprite.scale);
                float dy = -sprite.origin.Y * (sprite.useVScale ? sprite.vScale.Y : sprite.scale);
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
