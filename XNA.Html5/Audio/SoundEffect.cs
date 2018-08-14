using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xna.Framework.Content;
using Bridge.Html5;

namespace Microsoft.Xna.Framework.Audio
{
    public class SoundEffect : Loadable
    {
        public HTMLAudioElement Sound { get; set; }

        public SoundEffect()
        {

        }

        public void Play()
        {
            Sound.Play();
        }
    }
}
