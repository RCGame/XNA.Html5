using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Microsoft.Xna.Framework.Media
{
    public class MediaPlayer
    {
        private static bool gameHasControl = true;

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

        }

        public static void Stop()
        {

        }
    }
}
