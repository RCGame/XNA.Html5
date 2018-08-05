using System;
using FarseerPhysics.Dynamics;
using FarseerPhysics.Dynamics.Joints;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Input;

namespace FarseerPhysics.Utility
{
    public class PhysicsGameScreen : GameScreen
    {
        public Camera2D Camera;
        protected World World;

        private float _agentForce;
        private float _agentTorque;
        private FixedMouseJoint _fixedMouseJoint;
        private Body _userAgent;

        protected PhysicsGameScreen(ScreenManager screenManager)
        {
            HasCursor = true;
            EnableCameraControl = true;
            _userAgent = null;
            World = null;
            Camera = null;

            ScreenManager = screenManager;
            //We enable diagnostics to show get values for our performance counters.
            Settings.EnableDiagnostics = true;

            if (World == null)
            {
                World = new World(Vector2.Zero);
            }
            else
            {
                World.Clear();
            }

            if (Camera == null)
            {
                Camera = new Camera2D(screenManager.GraphicsDevice);
            }
            else
            {
                Camera.ResetCamera();
            }

            // Loading may take a while... so prevent the game from "catching up" once we finished loading
			//new MonoGame.iOS doesn't seem to like this, need to retest on other platforms
            //screenManager.Game.ResetElapsedTime();
			////////////////////////////////////////////
        }

        public bool EnableCameraControl { get; set; }

        protected void SetUserAgent(Body agent, float force, float torque)
        {
            _userAgent = agent;
            _agentForce = force;
            _agentTorque = torque;
        }

        public override void LoadContent()
        {
            base.LoadContent();    
        }

        public override void Update(GameTime gameTime, bool otherScreenHasFocus, bool coveredByOtherScreen)
        {
            if (!coveredByOtherScreen && !otherScreenHasFocus)
            {
                // variable time step but never less then 30 Hz
                World.Step(Math.Min((float)gameTime.ElapsedGameTime.TotalSeconds, (1f / 50f)));
            }
            else
            {
                World.Step(0f);
            }
            Camera.Update(gameTime);
            base.Update(gameTime, otherScreenHasFocus, coveredByOtherScreen);
        }

        public override void Draw(GameTime gameTime)
        {
            Matrix projection = Camera.SimProjection;
            Matrix view = Camera.SimView;

            base.Draw(gameTime);
        }
    }
}