using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Microsoft.Xna.Framework.Content
{
    public class ContentManager
    {
        public string RootDirectory { get; set; }
        public T Load<T>(string name) where T : Graphics.GraphicsResource, new()
        {
            T t = new T();
            t.Name = RootDirectory + "/" + name;
            return t;
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
