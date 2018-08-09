using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Microsoft.Xna.Framework.Input.Touch
{
    public class TouchPanel
    {
        public static GestureType EnabledGestures { get; set; }

        public static TouchCollection GetState()
        {
            return new TouchCollection();
        }
    }
}
