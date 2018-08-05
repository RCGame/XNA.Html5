#region File Description
//-----------------------------------------------------------------------------
// BasicEffect.cs
//
// Microsoft XNA Community Game Platform
// Copyright (C) Microsoft Corporation. All rights reserved.
//-----------------------------------------------------------------------------
#endregion

#region Using Statements
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using System;
#endregion

namespace Microsoft.Xna.Framework.Graphics
{
    /// <summary>
    /// Built-in effect that supports optional texturing, vertex coloring, fog, and lighting.
    /// </summary>
    public class BasicEffect : Effect
    {
        public bool VertexColorEnabled;
        public bool TextureEnabled;
        public Texture2D Texture;
        public BasicEffect(GraphicsDevice device)
            : base(device)
        {
        }
    }
}
