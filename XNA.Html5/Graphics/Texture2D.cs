using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bridge.Html5;

namespace Microsoft.Xna.Framework.Graphics
{
    public class Texture2D : GraphicsResource
    {
        public int Width { get; private set; }
        public int Height { get; private set; }
        private HTMLImageElement image;
        public HTMLImageElement Image
        {
            get { return image; }
            set
            {
                image = value;
                Width = image.NaturalWidth;
                Height = image.NaturalHeight;
            }
        }

        public Texture2D()
        {
            
        }

        public Texture2D(GraphicsDevice graphicsDevice, int width, int height)
        {

        }

        public void GetData<T>(T[] data)
        {

        }
        public void SetData(Color[] color)
        {

        }
    }
}
