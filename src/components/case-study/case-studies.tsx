import { Component, h } from '@stencil/core';

@Component({
  tag: 'case-studies',
  styleUrl: 'case-studies.css',
  shadow: true,
})

export class CaseStudies {
  render() {
    return (
      <app-layout>
        Case Studies
      </app-layout>
    );
  }
}
