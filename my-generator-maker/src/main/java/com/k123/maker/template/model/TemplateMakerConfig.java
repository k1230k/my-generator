package com.k123.maker.template.model;

import com.k123.maker.meta.Meta;
import com.k123.maker.template.TemplateMaker;
import lombok.Data;

/**
 * 制作模板
 *
 * @param newMeta
 * @param originProjectPath
 * @param templateMakerFileConfig
 * @param templateMakerModelConfig
 * @param id
 * @return
 */
@Data
public class TemplateMakerConfig {
    private Meta meta;
    private String originProjectPath;
    private TemplateMakerFileConfig fileConfig;
    private TemplateMakerModelConfig modelConfig;
    private Long id;
}
