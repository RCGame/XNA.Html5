using FarseerPhysics.Common;
using FarseerPhysics.Dynamics;
using FarseerPhysics.Factories;
using FarseerPhysics.Utility;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;

namespace FarseerPhysics.Samples
{
    public class Border
    {
        private Body _border;
        private SpriteBatch _batch;
        private Texture2D texture;
        private float w, h;

        public Border(World world, ScreenManager screenManager, Vector2 position, float width, float height, Texture2D tex)
        {
            w = width;
            h = height;
            _batch = screenManager.SpriteBatch;
            _border = BodyFactory.CreateRectangle(world, width, height, 1f);
            _border.Position = position;
            _border.BodyType = BodyType.Static;
            texture = tex;
        }

        public void Draw()
        {
            _batch.Draw(texture, ConvertUnits.ToDisplayUnits(_border.Position), null, Color.White, 0f, new Vector2(texture.Width / 2f, texture.Height / 2f), new Vector2(ConvertUnits.ToDisplayUnits(1f) * w / texture.Width, ConvertUnits.ToDisplayUnits(1f) * h / texture.Height), SpriteEffects.None, 0f);
        }

    }
}