/*
 * grunt-resources-html
 * https://github.com/MarioPerezH/grunt-resources-html
 *
 * Copyright (c) 2017 Mario Pérez
 * Licensed under the MIT license.
 */

interface IOptions {
    verbose: boolean,
    regexScript: string;
    regexCss: string;
    modifer: string;
}

interface IFile {
    src: string[] | string;
    dest: string;
}

export class GruntResourceHtml {
    private static options: IOptions;
    private static files: IFile[];
    private static grunt: any;

    static proccess(grunt: any, task: any) {
        this.grunt = grunt;

        if (!task.files.length) {
            this.grunt.log.warn('There are no resources to process');
            return;
        }

        this.options = task.options(<IOptions>{
            verbose: true,
            regexCss: '<link href="(.*|\n*)" rel(\s*|\n*)',
            regexScript: '<script src="(.*|\n*)">(\s*|\n*)<\/script>',
            modifer: 'ig'
        });

        // custom targets
        (<IFile[]>task.files).forEach(file => {
            
            // existing roads
            let paths: string[] = (<string[]>file.src).filter(path=> this.existsFile(path));
            
            paths.forEach(path => {
                let filestring = grunt.file.read(path),
                    srcScripts: string[] = this.getSources(this.options.regexScript, filestring, this.options.modifer),
                    srcCss: string[] = this.getSources(this.options.regexCss, filestring, this.options.modifer),
                    srcs: string[] = srcScripts.concat(srcCss);

                srcs.forEach(src => {
                    if (!this.existsFile(src)) { 
                        if (this.options.verbose) {
                            this.grunt.log.warn(`Path not found: ${src}`);
                        }    
                        return;
                    }

                    let name = this.getNameFromPath(src);

                    this.copySources(src, file.dest, name);

                    if (this.options.verbose) { 
                        this.grunt.log.writeln(`${name} writting`);
                    }
                })
            });
        });
    }

    static copySources(src: string, dest: string, nameFile: string) {
        this.grunt.file.copy(src, `${dest}/${nameFile}`);
    }

    static getSources(regexExpress: string, fileString: string, modifiers: string): string[] {
        var regex = new RegExp(regexExpress, modifiers),
            match: RegExpExecArray | null,
            matchs: string[] = [];

        while ((match = regex.exec(fileString)) !== null) {           
            matchs.push(match[1].split('/').filter((path) => path !== '..').join('/'));
        };
        return matchs;
    }

    static existsFile(path: string) {
        return this.grunt.file.exists(path);
    }

    static getNameFromPath(path: string) {
        return path.split('/').reverse()[0];
    }
}