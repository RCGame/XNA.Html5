using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xna.Framework.Content;

namespace Microsoft.Xna.Framework.Media
{
    public class MediaPlayer
    {
        private static bool gameHasControl = true;
        internal static ContentManager contentManager;
        private static Song currentSong;

        public static bool GameHasControl
        {
            get
            {
                return gameHasControl;
            }
        }
        public static bool IsRepeating { get; set; }

        public static void Play<T>(T obj)
        {
            if (typeof(T) == typeof(Song))
            {
                Song song = obj as Song;
                if (currentSong == song)
                {
                    song.Resume();
                }
                else
                {
                    song.SetLoop(IsRepeating);
                    currentSong = song;
                    if (song.Loaded)
                    {
                        song.Play();
                    }
                    else
                    {
                        contentManager.OnAllResourceLoaded = () =>
                        {
                            song.Play();
                        };
                    }
                }
            }
        }

        public static void Stop()
        {
            if (currentSong.Loaded)
            {
                currentSong.Suspend();
            }
        }

        internal static void Unload()
        {
            currentSong = null;
        }
    }
}
