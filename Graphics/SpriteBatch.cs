using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Microsoft.Xna.Framework.Graphics
{
    public class SpriteBatch
    {
        public SpriteBatch(GraphicsDevice graphicDevice)
        {

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
        }

        public void Begin()
        {

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

        }

        public void DrawString(
            SpriteFont spriteFont, string text, Vector2 position, Color color,
            float rotation, Vector2 origin, float scale, SpriteEffects effects, float layerDepth)
        {

        }

        public void End()
        {

        }
    }
}
