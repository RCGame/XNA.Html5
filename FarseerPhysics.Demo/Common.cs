using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Content;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;
using Microsoft.Xna.Framework.Input.Touch;

using FarseerPhysics.Common;
using FarseerPhysics.Common.Decomposition;
using FarseerPhysics.Common.PolygonManipulation;
using FarseerPhysics.Dynamics;
using FarseerPhysics.Factories;
using FarseerPhysics.Utility;

namespace FarseerPhysics.Utility
{
    public static class Common
    {

        public static List<Vertices> GetCompoundPolygonVertices(Texture2D _polygonTexture, float _scale, ref Vector2 origin)
        {
            uint[] data = new uint[_polygonTexture.Width * _polygonTexture.Height];
            _polygonTexture.GetData(data);

            Vertices textureVertices = PolygonTools.CreatePolygon(data, _polygonTexture.Width, false);

            Vector2 centroid = -textureVertices.GetCentroid();
            textureVertices.Translate(ref centroid);

            origin = -centroid;

            textureVertices = SimplifyTools.ReduceByDistance(textureVertices, 4f);

            List<Vertices> list = BayazitDecomposer.ConvexPartition(textureVertices);

            Vector2 vertScale = new Vector2(ConvertUnits.ToSimUnits(1)) * _scale;
            foreach (Vertices vertices in list)
            {
                vertices.Scale(ref vertScale);
            }

            return list;
        }

        public static Vertices GetPolygonVertices(Texture2D _polygonTexture, float _scale, ref Vector2 origin)
        {
            uint[] data = new uint[_polygonTexture.Width * _polygonTexture.Height];
            _polygonTexture.GetData(data);

            Vertices textureVertices = PolygonTools.CreatePolygon(data, _polygonTexture.Width, false);

            Vector2 centroid = -textureVertices.GetCentroid();
            textureVertices.Translate(ref centroid);

            origin = -centroid;

            textureVertices = SimplifyTools.CollinearSimplify(textureVertices, 10f);
            Vector2 vertScale = new Vector2(ConvertUnits.ToSimUnits(1)) * _scale;
            textureVertices.Scale(ref vertScale);

            return textureVertices;
        }

        public static Color GetAlpha(float opacity)
        {
            return new Color(opacity, opacity, opacity, opacity);
        }

        public static bool IsRectangleTouch(Vector2 position, Vector2 origin, float rectWidth, float rectHeight)
        {
            return (position.X >= origin.X - rectWidth / 2 && position.X <= origin.X + rectWidth / 2 &&
                position.Y >= origin.Y - rectHeight / 2 && position.Y <= origin.Y + rectHeight / 2);
        }
    }
}
