using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xna.Framework.Graphics;

namespace Microsoft.Xna.Framework
{
    public class GraphicsDeviceManager
    {
        public bool PreferMultiSampling { get; set; }
        public DisplayOrientation SupportedOrientations { get; set; }
        public SurfaceFormat PreferredBackBufferFormat { get; set; }
        public bool IsFullScreen { get; set; }
        public event EventHandler<PreparingDeviceSettingsEventArgs> PreparingDeviceSettings;

        public GraphicsDeviceManager(Game game)
        {

        }

        public void ApplyChanges()
        {

        }
    }
}
