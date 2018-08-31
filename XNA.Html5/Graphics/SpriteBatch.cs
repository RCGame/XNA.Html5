using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Microsoft.Xna.Framework.Graphics
{
    internal class DrawSpec
    {
        internal Matrix? transform;
        internal List<SpriteSpec> spriteSpecs;
    }

    internal class SpriteSpec
    {
        internal Texture2D texture;
        internal Vector2 position;
        internal Rectangle? rectangle;
        internal Color color;
        internal float rotation;
        internal Vector2 origin;
        internal float scale;
        internal Vector2 vScale;
        internal bool useVScale;
        internal SpriteEffects effects;
    }

    public class SpriteBatch
    {
        DrawSpec drawSpecs;
        GraphicsDevice _graphicDevice;

        public SpriteBatch(GraphicsDevice graphicDevice)
        {
            _graphicDevice = graphicDevice;
            drawSpecs = new DrawSpec();
            drawSpecs.spriteSpecs = new List<SpriteSpec>();
        }

        public void Draw(Texture2D texture,
                Vector2 position,
                Rectangle? sourceRectangle,
                Color color,
                float rotation,
                Vector2 origin,
                float scale,
                SpriteEffects effects,
                float layerDepth)
        {
            drawSpecs.spriteSpecs.Add(new SpriteSpec
            {
                texture = texture,
                position = position,
                rectangle = sourceRectangle,
                color = color,
                rotation = rotation,
                origin = origin,
                scale = scale,
                effects = effects,
                useVScale = false
            });
        }

        public void Draw(Texture2D texture,
                Vector2 position,
                Rectangle? sourceRectangle,
                Color color,
                float rotation,
                Vector2 origin,
                Vector2 scale,
                SpriteEffects effects,
                float layerDepth)
        {
            drawSpecs.spriteSpecs.Add(new SpriteSpec
            {
                texture = texture,
                position = position,
                rectangle = sourceRectangle,
                color = color,
                rotation = rotation,
                origin = origin,
                vScale = scale,
                effects = effects,
                useVScale = true
            });
        }

        public void Begin()
        {
            drawSpecs.transform = null;
            drawSpecs.spriteSpecs.Clear();
        }

        public void Begin
        (
             int sortMode = 0,
             object blendState = null,
             object samplerState = null,
             object depthStencilState = null,
             object rasterizerState = null,
             object effect = null,
             Matrix? transformMatrix = null
            )
        {
            drawSpecs.transform = transformMatrix;
            drawSpecs.spriteSpecs.Clear();
        }

        public void DrawString(
            SpriteFont spriteFont, string text, Vector2 position, Color color,
            float rotation, Vector2 origin, float scale, SpriteEffects effects, float layerDepth)
        {

        }

        public void End()
        {
            _graphicDevice.Draw(drawSpecs);
        }
    }
}
