package com.k123.maker.template.model;

import lombok.Data;

@Data
public class TemplateMakerOutputConfig {

    //是否从未分组的文件中移除组内的模板文件配置
    private boolean removeGroupFilesFromRoot = true;
}
