using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Audio;
using Microsoft.Xna.Framework.Media;

using Bridge.Html5;

namespace Microsoft.Xna.Framework.Content
{
    public class Loadable
    {
        public virtual string Name { get; set; }
    }

    public class ContentManager
    {
        public string RootDirectory { get; set; }
        public GraphicsDevice _graphicsDevice { get; set; }
        protected Dictionary<string, bool> ResourcesReady;

        public ContentManager()
        {
            ResourcesReady = new Dictionary<string, bool>();
        }

        public ContentManager(IServiceProvider serviceProvider, string rootDirectory)
        {
        }

        public T Load<T>(string name) where T : Loadable, new()
        {
            ResourcesReady.Add(name, false);
            if (typeof(T) == typeof(Texture2D))
            {
                var t = new Texture2D();
                var img = new HTMLImageElement();
                img.OnLoad = (e) =>
                {
                    t.Image = img;
                    t.Name = name;
                    ResourcesReady[name] = true;
                };
                img.Src = RootDirectory + "/" + name + ".png";            
                return t as T;
            }
            else if (typeof(T) == typeof(SoundEffect))
            {
                var t = new SoundEffect();
                t.Load(RootDirectory + "/" + name + ".wav", () => {
                    t.Name = name;
                    ResourcesReady[name] = true;
                });
                return t as T;
            }
            else if (typeof(T) == typeof(Song))
            {
                var t = new Song();
                var sound = new HTMLAudioElement();
                
                sound.Preload = "none";
                sound.OnCanPlayThrough = (e) =>
                {
                    t.Sound = sound;
                    t.Name = name;
                    ResourcesReady[name] = true;
                };
                sound.Src = RootDirectory + "/" + name + ".mp3";
                Document.Body.AppendChild(sound);
                sound.Load();
                return t as T;
            }
            else
            {
                return new T();
            }
        }

        public bool AllResoucesLoaded
        {
            get
            {
                return ResourcesReady.Where(t => !t.Value).Count() == 0;
            }
        }

        public void Unload()
        {
            ResourcesReady.Clear();
        }
    }
}
