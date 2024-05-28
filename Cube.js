class Cube {
    constructor() {
        this.type = 'cube';
        this.color = [1.0, 1.0, 1.0, 1.0];
        this.matrix = new Matrix4();
        this.textureNum = -2;
        this.cubeVerts32 = new Float32Array([
            // Vertex coordinates and UV coordinates
            0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0,
            0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1,
            0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1,
            0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0,
            1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
            1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0,
            0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1,
            0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0,
            0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1,
            0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0,
            0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0,
            0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1
        ]);
    }
    render() {
        //var xy = this.position;
        var rgba = this.color;

        // pass the texture number
        gl.uniform1i(u_whichTexture, this.textureNum);

        // Pass the color of a point to u_FragColor variable
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

        // pass matrix to u_ModelMatrix attribute
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

        // front of cube
        drawTriangle3DUVNormal([0,0,0, 1,1,0, 1,0,0], [0,0, 1,1, 1,0], [0,0,-1, 0,0,-1, 0,0,-1]);
        drawTriangle3DUVNormal([0,0,0, 0,1,0, 1,1,0], [0,0, 0,1, 1,1], [0,0,-1, 0,0,-1, 0,0,-1]);

        // top of cube
        //gl.uniform4f(u_FragColor, rgba[0]*.9, rgba[1]*.9, rgba[2]*.9, rgba[3])
        drawTriangle3DUVNormal([0,1,0, 0,1,1, 1,1,1], [0,0, 1,1, 1,0], [0,1,0,0,1,0,0,1,0]);
        drawTriangle3DUVNormal([0,1,0, 1,1,1, 1,1,0], [0,0, 0,1, 1,1], [0,1,0,0,1,0,0,1,0]);

        // right side
        //gl.uniform4f(u_FragColor, rgba[0]*.8, rgba[1]*.8, rgba[2]*.8, rgba[3])
        drawTriangle3DUVNormal([0,0,0, 0,1,0, 0,1,1], [0,0, 1,1, 1,0], [-1,0,0, -1,0,0, -1,0,0]);
        drawTriangle3DUVNormal([0,0,0, 0,1,1, 0,0,1], [0,0, 0,1, 1,1], [-1,0,0, -1,0,0, -1,0,0]);

        // left side
        //gl.uniform4f(u_FragColor, rgba[0]*.7, rgba[1]*.7, rgba[2]*.7, rgba[3])
        drawTriangle3DUVNormal([1,0,0, 1,1,0, 1,1,1], [0,0, 1,1, 1,0], [1,0,0, 1,0,0, 1,0,0]);
        drawTriangle3DUVNormal([1,0,0, 1,1,1, 1,0,1], [0,0, 0,1, 1,1], [1,0,0, 1,0,0, 1,0,0]);

        // back side
       // gl.uniform4f(u_FragColor, rgba[0]*.6, rgba[1]*.6, rgba[2]*.6, rgba[3])
        drawTriangle3DUVNormal([0,0,0, 1,0,0, 1,0,1], [0,0, 1,1, 1,0], [0,-1,0, 0,-1,0, 0,-1,0]);
        drawTriangle3DUVNormal([0,0,0, 1,0,1, 0,0,1], [0,0, 0,1, 1,1], [0,-1,0, 0,-1,0, 0,-1,0]);

        //bottom side
        //gl.uniform4f(u_FragColor, rgba[0]*.5, rgba[1]*.5, rgba[2]*.5, rgba[3])
        drawTriangle3DUVNormal([0,0,1, 1,0,1, 1,1,1], [0,0, 1,1, 1,0], [0,0,1, 0,0,1, 0,0,1]);
        drawTriangle3DUVNormal([0,0,1, 1,1,1, 0,1,1], [0,0, 0,1, 1,1], [0,0,1, 0,0,1, 0,0,1]);
    }

    renderFaster() {
        var rgba = this.color;

        // Pass the texture number
        gl.uniform1i(u_whichTexture, this.textureNum);

        // Pass the color of a point to u_FragColor variable
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

        // Pass matrix to u_ModelMatrix attribute
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

        if (g_vertexBuffer == null) {
            initTriangle3D();
        }
        // Write data into the buffer object
        gl.bufferData(gl.ARRAY_BUFFER, this.cubeVerts32, gl.DYNAMIC_DRAW);

        var FSIZE = this.cubeVerts32.BYTES_PER_ELEMENT;

        // Assign the buffer object to a_Position variable
        gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 5, 0);
        gl.enableVertexAttribArray(a_Position);

        // Assign the buffer object to a_UV variable
        gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, FSIZE * 5, FSIZE * 3);
        gl.enableVertexAttribArray(a_UV);

        gl.drawArrays(gl.TRIANGLES, 0, 36);
    }

}
