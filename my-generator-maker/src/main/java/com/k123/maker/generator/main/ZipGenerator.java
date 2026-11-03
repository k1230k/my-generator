package com.k123.maker.generator.main;

public class ZipGenerator extends GenerateTemplate{


    @Override
    protected  String buildDist(String outputPath, String sourceCopuDestPath, String jarPath, String shellOutPutFilePath) {
        String distPath = super.buildDist(outputPath, sourceCopuDestPath, jarPath, shellOutPutFilePath);
        return super.buildZip(distPath);
    }
}
