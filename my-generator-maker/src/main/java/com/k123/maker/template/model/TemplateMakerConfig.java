package com.k123.maker.template.model;

import com.k123.maker.meta.Meta;
import com.k123.maker.template.TemplateMaker;
import lombok.Data;


/**
 * 制作模板
 */
@Data
public class TemplateMakerConfig {
    private Meta meta = new Meta();
    private String originProjectPath;
    private TemplateMakerFileConfig fileConfig = new TemplateMakerFileConfig();
    private TemplateMakerModelConfig modelConfig = new TemplateMakerModelConfig();
    private Long id;
    private TemplateMakerOutputConfig outputConfig = new TemplateMakerOutputConfig();
}
