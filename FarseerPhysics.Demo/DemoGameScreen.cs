using System.Text;
using FarseerPhysics.Samples;
using FarseerPhysics.Collision.Shapes;
using FarseerPhysics.Common;
using FarseerPhysics.Dynamics;
using FarseerPhysics.Factories;
using FarseerPhysics.Utility;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Audio;
using Microsoft.Xna.Framework.Media;
using Microsoft.Xna.Framework.Input.Touch;
using Microsoft.Xna.Framework.Input;

namespace FarseerPhysics.Samples.Demos
{
    internal class DemoGameScreen : PhysicsGameScreen
    {
        private const int PyramidBaseBodyCount = 14;
        private Texture2D background;

        private Pyramid _pyramid;
        private Agent agent;
        private Border b1, b2, b3, b4;
        private Vector2 touchOn, touchOff;
        private bool didPress = false;
        private Song song;
        private bool musicStarted = false;

        public DemoGameScreen(ScreenManager screenManager) : base(screenManager)
        {
        }

        public override void LoadContent()
        {
            base.LoadContent();
            float worldRatio = (float)ScreenManager.GraphicsDevice.Viewport.Height / 35f;
            float frameWidth = 50f;
            float frameHeight = 30f;
            float frameThick = 1f;
            Vector2 frameStartPos = new Vector2(1f, 2f);
            World.Gravity = new Vector2(0f, 80f);
            background = ScreenManager.Content.Load<Texture2D>("Assets/Background");
            _pyramid = new Pyramid(World, ScreenManager, new Vector2(35f, 33f), 5, 1f);
            agent = new Agent(World, ScreenManager, new Vector2(5f, 28f));
            b1 = new Border(World, ScreenManager, new Vector2(frameStartPos.X, frameStartPos.Y + frameHeight / 2f), frameThick, frameHeight, _pyramid.tex);
            b2 = new Border(World, ScreenManager, new Vector2(frameStartPos.X + frameWidth, frameStartPos.Y + frameHeight / 2f), frameThick, frameHeight, _pyramid.tex);
            b3 = new Border(World, ScreenManager, new Vector2(frameStartPos.X + frameWidth / 2f, frameStartPos.Y), frameWidth, frameThick, _pyramid.tex);
            b4 = new Border(World, ScreenManager, new Vector2(frameStartPos.X + frameWidth / 2f, frameStartPos.Y + frameHeight), frameWidth, frameThick, _pyramid.tex);
            song = ScreenManager.Content.Load<Song>("Audio/CelticHarps");
            MediaPlayer.IsRepeating = true;
        }

        public override void Update(GameTime gameTime, bool otherScreenHasFocus, bool coveredByOtherScreen)
        {
            if (!musicStarted)
            {
                MediaPlayer.Play(song);
                musicStarted = true;
            }
            base.Update(gameTime, otherScreenHasFocus, coveredByOtherScreen);
            var state = TouchPanel.GetState();
            foreach (var touch in state)
            {
                switch (touch.State)
                {
                    case TouchLocationState.Pressed:
                        touchOn = touch.Position;
                        break;
                    case TouchLocationState.Released:
                        touchOff = touch.Position;
                        var force = touchOff - touchOn;
                        agent.Body.ApplyForce(Vector2.Multiply(force, 300f));
                        break;
                }
            }

            //var mouse = Mouse.GetState();
            //switch (mouse.LeftButton)
            //{
            //    case ButtonState.Pressed:
            //        if (!didPress)
            //        {
            //            touchOn = new Vector2(mouse.Position.X, mouse.Position.Y);
            //            didPress = true;
            //            //MediaPlayer.Play(song);
            //        }
            //        break;
            //    case ButtonState.Released:
            //        if (didPress)
            //        {
            //            touchOff = new Vector2(mouse.Position.X, mouse.Position.Y);
            //            var force = touchOff - touchOn;
            //            agent.Body.ApplyForce(Vector2.Multiply(force, 150f));
            //            didPress = false;
            //        }
            //        break;
            //}
        }

        public override void Draw(GameTime gameTime)
        {
            ConvertUnits.SetDisplayUnitToSimUnitRatio((float)ScreenManager.GraphicsDevice.Viewport.Height / 35f);
            ScreenManager.SpriteBatch.Begin(0, null, null, null, null, null, null);
            ScreenManager.SpriteBatch.Draw(background, new Vector2(ScreenManager.GraphicsDevice.Viewport.Width / 2f, ScreenManager.GraphicsDevice.Viewport.Height / 2f), null, Color.White, 0f, new Vector2(background.Width / 2f, background.Height / 2f), (float)ScreenManager.GraphicsDevice.Viewport.Height / (float)background.Height, SpriteEffects.None, 0f);
            _pyramid.Draw();
            agent.Draw();
            b1.Draw();
            b2.Draw();
            b3.Draw();
            b4.Draw();
            ScreenManager.SpriteBatch.End();
            base.Draw(gameTime);
        }
    }
}