using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xna.Framework.Content;
using Bridge;
using Bridge.Html5;

namespace Microsoft.Xna.Framework.Audio
{

    public class SoundEffect : Loadable
    {
        internal int Index;

        public SoundEffect()
        {
            Index = Script.Write<int>("addAudioContext()");
        }
        

        public void Play()
        {
            Play(Index);
        }

        private void Play(int index)
        {
            Script.Write("audioContexts[index].play();");
        }

        internal void Load(string src, Action d)
        {
            Load(Index, src, d);
        }

        private void Load(int index, string src, Action d)
        {
            Script.Write("audioContexts[index].load(src, d);");
        }
    }
}
