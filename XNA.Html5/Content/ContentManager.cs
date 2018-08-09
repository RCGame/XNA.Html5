using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xna.Framework.Graphics;
using Bridge.Html5;

namespace Microsoft.Xna.Framework.Content
{
    public class ContentManager
    {
        public string RootDirectory { get; set; }
        public GraphicsDevice _graphicsDevice { get; set; }

        public T Load<T>(string name) where T : GraphicsResource, new()
        {
            if (typeof(T) == typeof(Texture2D))
            {
                var t = new Texture2D();
                var img = new HTMLImageElement();
                img.OnLoad = (e) =>
                {
                    t.Image = img;
                    Console.WriteLine(img.Src + " loaded " + t.Image.Width + "x" + t.Image.Height);
                };
                img.Src = RootDirectory + "/" + name + ".png";            
                return t as T;
            }
            else
            {
                return new T();
            }
        }

        public ContentManager()
        {

        }

        public ContentManager(IServiceProvider serviceProvider, string rootDirectory)
        {
        }

        public void Unload()
        {

        }
    }
}
